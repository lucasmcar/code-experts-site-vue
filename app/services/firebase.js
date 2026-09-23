import { initializeApp, getApps } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyACfOJVQmRSuLdbLUPnXBXP8TbRFlQ5szA',
  authDomain: 'code-experts-sistemas.firebaseapp.com',
  projectId: 'code-experts-sistemas',
  storageBucket: 'code-experts-sistemas.firebasestorage.app',
  messagingSenderId: '137520192921',
  appId: '1:137520192921:web:4d7a26f558180d84abc708',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export async function requestNotificationPermission() {
  if (!(await isSupported())) {
    throw new Error('Este navegador não suporta notificações push.')
  }

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    throw new Error('Permissão de notificação negada.')
  }

  // Registra (ou reaproveita) o SW e garante que o token fique atrelado a ele.
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  await navigator.serviceWorker.ready

  const token = await getToken(getMessaging(app), {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  })

  if (!token) {
    throw new Error('Não foi possível obter o token de notificação.')
  }

  return token
}
