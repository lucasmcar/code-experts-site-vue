let recaptchaPromise = null

export function useRecaptcha() {
  function loadRecaptcha() {
    if (recaptchaPromise) {
      return recaptchaPromise
    }

    recaptchaPromise = new Promise((resolve, reject) => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha)
        return
      }

      const script = document.createElement('script')

      script.src =
        'https://www.google.com/recaptcha/api.js?render=' + import.meta.env.VITE_RECAPTCHA_SITE_KEY

      script.async = true
      script.defer = true

      script.onload = () => {
        window.grecaptcha.ready(() => {
          resolve(window.grecaptcha)
        })
      }

      script.onerror = () => {
        reject(new Error('Não foi possível carregar o reCAPTCHA.'))
      }

      document.head.appendChild(script)
    })

    return recaptchaPromise
  }

  async function execute(action = 'contact') {
    const grecaptcha = await loadRecaptcha()

    return grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
      action,
    })
  }

  return {
    loadRecaptcha,
    execute,
  }
}
