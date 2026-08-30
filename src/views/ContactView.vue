<template>
  <main class="contact-page">
    <section class="contact-hero">
      <div class="container contact-hero__content">
        <div>
          <span class="eyebrow"> Fale conosco </span>

          <h1>
            Vamos transformar
            <span>seu desafio</span>
            em solução.
          </h1>

          <p>
            Conte para nós o que sua empresa precisa. Nossa equipe pode ajudar você a encontrar a
            solução tecnológica mais adequada.
          </p>
        </div>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container contact-grid">
        <!-- INFORMAÇÕES -->
        <div class="contact-info">
          <div class="section-heading">
            <span class="eyebrow"> Entre em contato </span>

            <h2>Estamos prontos para ouvir você.</h2>

            <p>
              Seja para desenvolver um sistema, automatizar um processo ou buscar suporte
              tecnológico, fale conosco.
            </p>
          </div>

          <div class="contact-methods">
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-method"
            >
              <div class="contact-method__icon">↗</div>

              <div>
                <span>WhatsApp</span>
                <strong>(51) 9669-9337</strong>
              </div>
            </a>

            <div class="contact-method">
              <div class="contact-method__icon">@</div>

              <div>
                <span>E-mail</span>
                <strong>Entre em contato conosco</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- FORMULÁRIO -->
        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="sendToWhatsApp">
            <div class="form-row">
              <div class="form-group">
                <label for="name"> Nome * </label>

                <input id="name" v-model="form.name" type="text" placeholder="Seu nome" required />
              </div>

              <div class="form-group">
                <label for="company"> Empresa </label>

                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email"> E-mail </label>

                <input id="email" v-model="form.email" type="email" placeholder="seu@email.com" />
              </div>

              <div class="form-group">
                <label for="phone"> WhatsApp </label>

                <input id="phone" v-model="form.phone" type="tel" placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div class="form-group">
              <label for="subject"> Como podemos ajudar? * </label>

              <select id="subject" v-model="form.subject" required>
                <option value="" disabled>Selecione uma opção</option>

                <option value="Desenvolvimento de sistema">Desenvolvimento de sistema</option>

                <option value="Aplicativo">Aplicativo</option>

                <option value="Automação de processos">Automação de processos</option>

                <option value="Consultoria em TI">Consultoria em TI</option>

                <option value="Suporte e manutenção">Suporte e manutenção</option>

                <option value="Hospedagem">Hospedagem</option>

                <option value="Treinamento">Treinamento</option>

                <option value="Outro">Outro</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message"> Mensagem * </label>

              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                placeholder="Conte um pouco sobre o que você precisa..."
                required
              />
            </div>

            <button type="submit" class="submit-button">
              <span>Enviar pelo WhatsApp</span>
              <span>→</span>
            </button>

            <p class="form-notice">
              Ao clicar em enviar, o WhatsApp será aberto com sua mensagem preenchida.
            </p>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue'

const whatsappNumber = '555196699337'

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const whatsappLink = computed(() => {
  return `https://wa.me/${whatsappNumber}`
})

function sendToWhatsApp() {
  const message = `
Olá, Code Experts!

Gostaria de entrar em contato.

*Nome:* ${form.name}
*Empresa:* ${form.company || 'Não informado'}
*E-mail:* ${form.email || 'Não informado'}
*WhatsApp:* ${form.phone || 'Não informado'}

*Assunto:* ${form.subject}

*Mensagem:*
${form.message}
  `.trim()

  const encodedMessage = encodeURIComponent(message)

  const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  window.open(url, '_blank')
}
</script>

<style scoped>
.contact-page {
  background: var(--color-background);
}

.contact-hero {
  padding: 110px 0 90px;

  background: radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.12), transparent 35%);
}

.contact-hero__content {
  max-width: 900px;
}

.eyebrow {
  display: inline-block;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.contact-hero h1 {
  max-width: 850px;

  margin-top: 18px;

  font-size: clamp(44px, 6vw, 70px);
  line-height: 1.05;
  letter-spacing: -3px;
}

.contact-hero h1 span {
  color: var(--color-primary);
}

.contact-hero p {
  max-width: 650px;

  margin-top: 25px;

  color: var(--color-text-secondary);

  font-size: 18px;
}

.contact-section {
  background: var(--color-background-secondary);
}

.contact-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;

  gap: 100px;

  align-items: start;
}

.section-heading h2 {
  margin-top: 15px;

  font-size: clamp(30px, 4vw, 42px);
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.section-heading p {
  margin-top: 20px;

  color: var(--color-text-secondary);

  font-size: 16px;
}

.contact-methods {
  display: flex;
  flex-direction: column;

  margin-top: 45px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 20px 0;

  border-bottom: 1px solid var(--color-border);
}

.contact-method__icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: rgba(37, 99, 235, 0.1);

  color: var(--color-primary);

  font-size: 20px;
  font-weight: 700;
}

.contact-method span {
  display: block;

  color: var(--color-text-secondary);

  font-size: 13px;
}

.contact-method strong {
  display: block;

  margin-top: 3px;

  font-size: 16px;
}

.contact-form-wrapper {
  padding: 40px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: white;

  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.06);
}

.contact-form {
  display: flex;
  flex-direction: column;

  gap: 22px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;

  padding: 13px 15px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: white;

  color: var(--color-text);

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);

  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.submit-button {
  min-height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  padding: 0 25px;

  border: 0;
  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: white;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.submit-button:hover {
  background: var(--color-primary-dark);

  transform: translateY(-2px);
}

.form-notice {
  margin-top: -5px;

  color: var(--color-text-secondary);

  font-size: 12px;
  text-align: center;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;

    gap: 60px;
  }
}

@media (max-width: 600px) {
  .contact-hero {
    padding: 75px 0 65px;
  }

  .contact-hero h1 {
    letter-spacing: -2px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form-wrapper {
    padding: 25px 20px;
  }
}
</style>
