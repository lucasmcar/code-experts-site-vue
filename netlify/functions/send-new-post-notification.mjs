import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'
import { createClient } from '@supabase/supabase-js'

function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApps()[0]
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }

  return initializeApp({
    credential: cert(serviceAccount),
  })
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        error: 'Método não permitido.',
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  try {
    const body = await request.json()

    const { title, excerpt, slug } = body

    if (!title || !slug) {
      return new Response(
        JSON.stringify({
          error: 'Título e slug são obrigatórios.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('push_subscriptions')
      .select('id, token')
      .eq('active', true)

    if (subscriptionsError) {
      console.error('Erro ao buscar inscrições:', subscriptionsError)

      throw subscriptionsError
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Nenhum navegador inscrito.',
          sent: 0,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const firebaseApp = getFirebaseApp()
    const messaging = getMessaging(firebaseApp)

    const tokens = subscriptions.map((subscription) => subscription.token)

    const url = `/blog/${slug}`

    let sent = 0
    let failed = 0

    /*
     * O FCM permite no máximo 500 destinatários
     * por envio multicast.
     */
    const chunks = []

    for (let i = 0; i < tokens.length; i += 500) {
      chunks.push(tokens.slice(i, i + 500))
    }

    for (const chunk of chunks) {
      const response = await messaging.sendEachForMulticast({
        tokens: chunk,

        notification: {
          title: 'Novo artigo no blog',
          body: excerpt || title,
        },

        data: {
          url,
          slug,
        },

        webpush: {
          fcmOptions: {
            link: url,
          },
        },
      })

      sent += response.successCount
      failed += response.failureCount

      /*
       * Remove tokens que não são mais válidos.
       */
      const invalidTokens = []

      response.responses.forEach((result, index) => {
        if (!result.success) {
          const errorCode = result.error?.code

          console.error('Erro ao enviar FCM:', errorCode, result.error?.message)

          if (
            errorCode === 'messaging/registration-token-not-registered' ||
            errorCode === 'messaging/invalid-registration-token'
          ) {
            invalidTokens.push(chunk[index])
          }
        }
      })

      for (const invalidToken of invalidTokens) {
        await supabase
          .from('push_subscriptions')
          .update({
            active: false,
          })
          .eq('token', invalidToken)
      }
    }

    console.log(`Notificação enviada: ${sent} sucesso(s), ${failed} falha(s).`)

    return new Response(
      JSON.stringify({
        success: true,
        sent,
        failed,
        total: tokens.length,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Erro ao enviar notificação:', error)

    return new Response(
      JSON.stringify({
        error: error.message || 'Erro interno ao enviar notificação.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
