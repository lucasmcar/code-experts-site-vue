importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyACfOJVQmRSuLdbLUPnXBXP8TbRFlQ5szA',
  authDomain: 'code-experts-sistemas.firebaseapp.com',
  projectId: 'code-experts-sistemas',
  storageBucket: 'code-experts-sistemas.firebasestorage.app',
  messagingSenderId: '137520192921',
  appId: '1:137520192921:web:4d7a26f558180d84abc708',
})

// Necessário para o FCM inicializar o listener de push.
// Como a mensagem é "data-only", o FCM NÃO exibe nada sozinho.
firebase.messaging()

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

// Evento nativo de push: dispara sempre (aba aberta, em segundo plano ou fechada).
self.addEventListener('push', (event) => {
  let payload = {}

  try {
    payload = event.data ? event.data.json() : {}
  } catch (e) {
    payload = {}
  }

  // Mensagens data-only chegam em payload.data
  const data = payload.data || {}

  const title = data.title || 'Code Experts Sistemas'

  const options = {
    body: data.body || 'Tem novidade no blog da Code Experts.',
    icon: '/favicon.png',
    badge: '/favicon.png',
    tag: data.slug || 'blog',
    data: { url: data.url || '/blog' },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const target = new URL(event.notification.data?.url || '/blog', self.location.origin).href

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const existing = clientList.find((c) => c.url.startsWith(self.location.origin))

      if (existing) {
        return existing.navigate(target).then((c) => (c || existing).focus())
      }

      return self.clients.openWindow(target)
    }),
  )
})
