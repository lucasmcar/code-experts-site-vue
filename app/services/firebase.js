import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging.js'

const firebaseConfig = {
  apiKey: 'AIzaSyACfOJVQmRSuLdbLUPnXBXP8TbRFlQ5szA',
  authDomain: 'code-experts-sistemas.firebaseapp.com',
  projectId: 'code-experts-sistemas',
  storageBucket: 'code-experts-sistemas.firebasestorage.app',
  messagingSenderId: '137520192921',
  appId: '1:137520192921:web:4d7a26f558180d84abc708',
  measurementId: 'G-K8WY2WYT17',
}

const app = initializeApp(firebaseConfig)

export async function getFirebaseMessaging() {
  const supported = await isSupported()

  if (!supported) {
    return null
  }

  return getMessaging(app)
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    throw new Error('Este navegador não suporta notificações.')
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('Este navegador não suporta Service Worker.')
  }

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    throw new Error('Permissão para notificações não concedida.')
  }

  const messaging = await getFirebaseMessaging()

  if (!messaging) {
    throw new Error('Firebase Cloud Messaging não é suportado neste navegador.')
  }

  // Registra o Service Worker
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

  console.log('Service Worker registrado:', registration)

  // Aguarda o Service Worker ficar ativo
  await navigator.serviceWorker.ready

  console.log('Service Worker ativo:', navigator.serviceWorker.controller)

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  })

  if (!token) {
    throw new Error('Não foi possível obter o token FCM.')
  }

  return token
}

export async function listenForegroundMessages(callback) {
  const messaging = await getFirebaseMessaging()

  if (!messaging) {
    return null
  }

  return onMessage(messaging, callback)
}
