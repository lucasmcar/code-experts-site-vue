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

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida:', payload)

  const title = payload.notification?.title || 'Code Experts Sistemas'

  const options = {
    body: payload.notification?.body || 'Tem novidade no blog da Code Experts.',
    icon: '/favicon.png',
    data: {
      url: payload.data?.url || '/blog',
    },
  }

  self.registration.showNotification(title, options)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification?.data?.url || '/blog'

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) {
            client.navigate(url)
            return client.focus()
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url)
        }
      }),
  )
})
