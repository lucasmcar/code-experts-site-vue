export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Método não permitido.',
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

    const { name, company, email, phone, subject, message, honeypot, recaptchaToken } = body

    /*
     * 1. HONEYPOT
     *
     * Humanos não devem preencher esse campo.
     */
    if (honeypot) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Não foi possível processar sua solicitação.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    /*
     * 2. VALIDAÇÃO BÁSICA
     *
     * Nunca confie somente na validação do Vue.
     */
    if (!name || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Preencha os campos obrigatórios.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    if (name.length > 100) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Nome inválido.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    if (message.length > 3000) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'A mensagem é muito longa.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    /*
     * 3. RECAPTCHA
     */
    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validação de segurança não realizada.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY

    if (!secret) {
      console.error('RECAPTCHA_SECRET_KEY não configurada.')

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Erro interno de configuração.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: new URLSearchParams({
        secret,
        response: recaptchaToken,
      }),
    })

    const recaptchaResult = await recaptchaResponse.json()

    /*
     * 4. VERIFICAÇÃO DO RECAPTCHA
     */
    if (!recaptchaResult.success) {
      console.warn('reCAPTCHA rejeitado:', recaptchaResult['error-codes'])

      return new Response(
        JSON.stringify({
          success: false,
          message: 'A validação de segurança falhou.',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    /*
     * 5. VERIFICAÇÃO DO SCORE
     *
     * O v3 retorna um score entre 0 e 1.
     */
    const score = recaptchaResult.score ?? 0

    if (score < 0.5) {
      console.warn('Score reCAPTCHA baixo:', score)

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Não foi possível validar sua solicitação.',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    /*
     * 6. AQUI ENTRARÁ O ENVIO
     *
     * Posteriormente:
     *
     * WhatsApp
     * E-mail
     * CRM
     * etc.
     */

    console.log('Contato validado:', {
      name,
      company,
      email,
      phone,
      subject,
      score,
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mensagem validada com sucesso.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Erro na função de contato:', error)

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Não foi possível processar sua solicitação.',
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
