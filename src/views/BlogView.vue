<template>
  <main class="blog-page">
    <!-- HERO -->
    <section class="blog-hero">
      <div class="container blog-hero__content">
        <span class="eyebrow"> Blog </span>

        <h1>
          Tecnologia para
          <span>empresas.</span>
        </h1>

        <p>
          Conteúdos para ajudar micro e pequenas empresas a entender melhor a tecnologia e encontrar
          soluções para seus desafios.
        </p>
      </div>
    </section>

    <!-- POSTS -->
    <section class="section blog-section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow"> Conteúdos recentes </span>

          <h2>Conheça nossos artigos.</h2>
        </div>

        <!-- AVISO DE NOTIFICAÇÕES -->

        <div v-if="showNotificationPrompt" class="notification-prompt">
          <div class="notification-prompt__content">
            <div class="notification-prompt__icon">🔔</div>

            <div class="notification-prompt__text">
              <h3>Receba novos artigos</h3>

              <p>Quer ser avisado quando publicarmos um novo conteúdo no blog?</p>
            </div>
          </div>

          <div class="notification-prompt__actions">
            <button
              type="button"
              class="notification-button notification-button--secondary"
              :disabled="notificationLoading"
              @click="dismissNotificationPrompt"
            >
              Agora não
            </button>

            <button
              type="button"
              class="notification-button notification-button--primary"
              :disabled="notificationLoading"
              @click="ativarNotificacoes"
            >
              {{ notificationLoading ? 'Ativando...' : 'Quero receber' }}
            </button>
          </div>
        </div>

        <!-- CARREGANDO -->

        <div v-if="loading" class="blog-loading">
          <div class="spinner"></div>

          <p>Carregando artigos...</p>
        </div>

        <!-- ERRO -->

        <div v-else-if="error" class="blog-error">
          <p>{{ error }}</p>

          <button type="button" @click="loadPosts">Tentar novamente</button>
        </div>

        <!-- NENHUM POST -->

        <div v-else-if="posts.length === 0" class="blog-empty">
          <h3>Nenhum artigo publicado.</h3>

          <p>Em breve teremos novos conteúdos para você.</p>
        </div>

        <!-- POSTS -->

        <div v-else class="posts-grid">
          <article v-for="post in posts" :key="post.id" class="post-card">
            <!-- CATEGORIA -->

            <div class="post-card__category">
              {{ getCategoryName(post) }}
            </div>

            <div class="post-card__body">
              <!-- META -->

              <div class="post-card__meta">
                <span>
                  {{ formatDate(post.published_at) }}
                </span>

                <span>•</span>

                <span>
                  {{ post.reading_time || '5 min de leitura' }}
                </span>
              </div>

              <!-- TÍTULO -->

              <h3>
                {{ post.title }}
              </h3>

              <!-- RESUMO -->

              <p>
                {{ post.excerpt }}
              </p>

              <!-- LINK -->

              <RouterLink :to="`/blog/${post.slug}`" class="post-card__link">
                Ler artigo

                <span>→</span>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->

    <section class="section blog-cta">
      <div class="container blog-cta__content">
        <span class="eyebrow"> Precisa de ajuda? </span>

        <h2>
          Seu problema pode ter uma
          <span>solução tecnológica.</span>
        </h2>

        <p>
          Se sua empresa enfrenta algum desafio relacionado à tecnologia, entre em contato conosco.
        </p>

        <RouterLink to="/contato" class="cta-button">
          Fale conosco

          <span>→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/services/supabase'
import { requestNotificationPermission } from '@/services/firebase'

const posts = ref([])
const loading = ref(true)
const error = ref('')

const showNotificationPrompt = ref(false)
const notificationLoading = ref(false)

const NOTIFICATION_DISMISSED_KEY = 'code_experts_notification_prompt_dismissed'

async function ativarNotificacoes() {
  if (notificationLoading.value) {
    return
  }

  notificationLoading.value = true

  try {
    const token = await requestNotificationPermission()

    const { error: supabaseError } = await supabase.from('push_subscriptions').insert({
      token,
      platform: 'web',
      user_agent: navigator.userAgent,
      active: true,
    })

    if (supabaseError) {
      // Token já cadastrado.
      // Nesse caso, consideramos a inscrição válida.
      if (supabaseError.code === '23505') {
        console.log('TOKEN FCM já estava cadastrado:', token)
      } else {
        console.error('Erro ao salvar token no Supabase:', supabaseError)

        throw new Error(
          'As notificações foram autorizadas, mas não foi possível registrar este navegador.',
        )
      }
    }

    console.log('TOKEN FCM:', token)

    // Só escondemos o aviso depois que tudo deu certo.
    showNotificationPrompt.value = false

    // Remove o estado "Agora não", caso exista.
    sessionStorage.removeItem(NOTIFICATION_DISMISSED_KEY)

    alert('Notificações ativadas com sucesso!')
  } catch (err) {
    console.error('Erro ao ativar notificações:', err)

    alert(err.message || 'Não foi possível ativar as notificações.')
  } finally {
    notificationLoading.value = false
  }
}

function dismissNotificationPrompt() {
  sessionStorage.setItem(NOTIFICATION_DISMISSED_KEY, 'true')

  showNotificationPrompt.value = false
}

function verificarNotificacoes() {
  // Verifica se o navegador possui suporte à API
  // de notificações.
  if (!('Notification' in window)) {
    return
  }

  // Se o usuário já autorizou as notificações,
  // não precisamos mostrar o convite.
  if (Notification.permission === 'granted') {
    return
  }

  // Se o usuário bloqueou as notificações,
  // não devemos insistir.
  if (Notification.permission === 'denied') {
    return
  }

  // Se o usuário escolheu "Agora não" nesta sessão,
  // não mostramos novamente.
  const dismissed = sessionStorage.getItem(NOTIFICATION_DISMISSED_KEY)

  if (dismissed === 'true') {
    return
  }

  showNotificationPrompt.value = true
}

async function loadPosts() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        status,
        featured_image,
        reading_time,
        published_at,
        categories (
          id,
          name
        )
      `,
      )
      .eq('status', 'published')
      .order('published_at', {
        ascending: false,
      })

    if (supabaseError) {
      throw supabaseError
    }

    posts.value = data || []

    console.log('POSTS DO BLOG:', posts.value)
  } catch (err) {
    console.error('Erro ao carregar posts do blog:', err)

    error.value = 'Não foi possível carregar os artigos.'
  } finally {
    loading.value = false
  }
}

function formatDate(date) {
  if (!date) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function getCategoryName(post) {
  return post.categories?.name || 'Sem categoria'
}

onMounted(() => {
  loadPosts()
  verificarNotificacoes()
})
</script>

<style scoped>
.blog-page {
  background: var(--color-background);
}

/* HERO */

.blog-hero {
  padding: 110px 0 90px;

  background: radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.12), transparent 35%);
}

.blog-hero__content {
  max-width: 850px;
}

.eyebrow {
  display: inline-block;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.blog-hero h1 {
  margin-top: 18px;

  font-size: clamp(44px, 6vw, 70px);
  line-height: 1.05;

  letter-spacing: -3px;
}

.blog-hero h1 span {
  display: block;

  color: var(--color-primary);
}

.blog-hero p {
  max-width: 650px;

  margin-top: 25px;

  color: var(--color-text-secondary);

  font-size: 18px;
  line-height: 1.7;
}

/* BLOG */

.blog-section {
  background: var(--color-background);
}

.section-heading {
  max-width: 700px;

  margin-bottom: 50px;
}

.section-heading h2 {
  margin-top: 15px;

  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;

  letter-spacing: -1.5px;
}

/* NOTIFICAÇÕES */

.notification-prompt {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 25px;

  margin-bottom: 45px;
  padding: 22px 25px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background-secondary);

  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.notification-prompt__content {
  display: flex;
  align-items: center;

  gap: 16px;
}

.notification-prompt__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  width: 46px;
  height: 46px;

  border-radius: 50%;

  background: rgba(37, 99, 235, 0.1);

  font-size: 22px;
}

.notification-prompt__text h3 {
  margin: 0;

  color: var(--color-text);

  font-size: 17px;
}

.notification-prompt__text p {
  margin: 5px 0 0;

  color: var(--color-text-secondary);

  font-size: 14px;
  line-height: 1.5;
}

.notification-prompt__actions {
  display: flex;
  align-items: center;

  gap: 10px;

  flex-shrink: 0;
}

.notification-button {
  padding: 10px 16px;

  border: 1px solid transparent;
  border-radius: var(--radius-md);

  font-family: inherit;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    background 0.2s ease;
}

.notification-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.notification-button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.notification-button--primary {
  background: var(--color-primary);

  color: white;
}

.notification-button--secondary {
  border-color: var(--color-border);

  background: var(--color-background);

  color: var(--color-text);
}

/* POSTS */

.posts-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 24px;
}

.post-card {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.post-card:hover {
  transform: translateY(-5px);

  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.post-card__category {
  padding: 18px 24px;

  border-bottom: 1px solid var(--color-border);

  color: var(--color-primary);

  font-size: 12px;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 1px;
}

.post-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 30px 24px;
}

.post-card__meta {
  display: flex;

  gap: 8px;

  color: var(--color-text-secondary);

  font-size: 12px;
}

.post-card h3 {
  margin-top: 18px;

  font-size: 24px;
  line-height: 1.2;

  letter-spacing: -0.5px;
}

.post-card p {
  margin-top: 15px;

  color: var(--color-text-secondary);

  font-size: 15px;
  line-height: 1.7;
}

.post-card__link {
  display: inline-flex;
  align-items: center;

  gap: 10px;

  width: fit-content;

  margin-top: auto;
  padding-top: 25px;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;
}

.post-card__link span {
  transition: transform 0.2s ease;
}

.post-card:hover .post-card__link span {
  transform: translateX(4px);
}

/* LOADING */

.blog-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 250px;

  color: var(--color-text-secondary);
}

.spinner {
  width: 30px;
  height: 30px;

  margin-bottom: 1rem;

  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ERRO */

.blog-error {
  padding: 40px;

  border: 1px solid #fecaca;
  border-radius: var(--radius-lg);

  background: #fef2f2;

  text-align: center;
}

.blog-error p {
  margin-bottom: 20px;

  color: #991b1b;
}

.blog-error button {
  padding: 10px 18px;

  border: 0;
  border-radius: var(--radius-md);

  background: var(--color-primary);

  color: white;

  font-weight: 700;

  cursor: pointer;
}

/* VAZIO */

.blog-empty {
  padding: 60px 20px;

  text-align: center;
}

.blog-empty h3 {
  font-size: 24px;
}

.blog-empty p {
  margin-top: 10px;

  color: var(--color-text-secondary);
}

/* CTA */

.blog-cta {
  background: var(--color-background-secondary);
}

.blog-cta__content {
  max-width: 850px;

  text-align: center;
}

.blog-cta h2 {
  margin-top: 15px;

  font-size: clamp(34px, 5vw, 55px);
  line-height: 1.1;

  letter-spacing: -2px;
}

.blog-cta h2 span {
  display: block;

  color: var(--color-primary);
}

.blog-cta p {
  max-width: 600px;

  margin: 22px auto 0;

  color: var(--color-text-secondary);

  font-size: 17px;
  line-height: 1.7;
}

.cta-button {
  display: inline-flex;
  align-items: center;

  gap: 15px;

  margin-top: 35px;
  padding: 14px 22px;

  border-radius: var(--radius-md);

  background: var(--color-primary);

  color: white;

  font-size: 15px;
  font-weight: 700;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.cta-button:hover {
  background: var(--color-primary-dark);

  transform: translateY(-2px);
}

.cta-button span {
  font-size: 18px;
}

/* RESPONSIVO */

@media (max-width: 900px) {
  .posts-grid {
    grid-template-columns: 1fr 1fr;
  }

  .notification-prompt {
    align-items: flex-start;
    flex-direction: column;
  }

  .notification-prompt__actions {
    width: 100%;
  }

  .notification-button {
    flex: 1;
  }
}

@media (max-width: 600px) {
  .blog-hero {
    padding: 75px 0 65px;
  }

  .blog-hero h1 {
    letter-spacing: -2px;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .notification-prompt {
    padding: 20px;
  }

  .notification-prompt__content {
    align-items: flex-start;
  }

  .notification-prompt__actions {
    flex-direction: column-reverse;
  }

  .notification-button {
    width: 100%;
  }
}
</style>
