<template>
  <!-- CARREGANDO -->
  <main v-if="loading" class="not-found">
    <div class="container">
      <span class="eyebrow"> Blog </span>

      <h1>Carregando artigo...</h1>
    </div>
  </main>

  <!-- ARTIGO -->
  <main v-else-if="post" class="post-page">
    <!-- HEADER -->
    <section class="post-hero">
      <div class="container post-hero__content">
        <RouterLink to="/blog" class="back-link"> ← Voltar para o blog </RouterLink>

        <span class="eyebrow">
          {{ post.category }}
        </span>

        <h1>
          {{ post.title }}
        </h1>

        <p class="post-excerpt">
          {{ post.excerpt }}
        </p>

        <div class="post-meta">
          <span>
            {{ post.author }}
          </span>

          <span>•</span>

          <span>
            {{ post.date }}
          </span>

          <span>•</span>

          <span>
            {{ post.readingTime }}
          </span>
        </div>
      </div>
    </section>

    <!-- CONTEÚDO -->
    <article class="section post-content-section">
      <div class="container">
        <div class="post-content">
          <template v-for="(block, index) in post.content" :key="index">
            <!-- PARÁGRAFO -->
            <p v-if="block.type === 'paragraph'">
              {{ block.content || block.text }}
            </p>

            <!-- TÍTULO -->
            <h2 v-else-if="block.type === 'heading'">
              {{ block.content || block.text }}
            </h2>
          </template>
        </div>
      </div>
    </article>

    <!-- CTA -->
    <section class="section post-cta">
      <div class="container post-cta__content">
        <span class="eyebrow"> Code Experts Sistemas </span>

        <h2>
          Sua empresa também pode
          <span>usar melhor a tecnologia.</span>
        </h2>

        <p>Entre em contato e conte para nós qual desafio sua empresa está enfrentando.</p>

        <RouterLink to="/contato" class="cta-button">
          Fale conosco
          <span>→</span>
        </RouterLink>
      </div>
    </section>
  </main>

  <!-- ERRO AO CARREGAR -->
  <main v-else-if="loadError" class="not-found">
    <div class="container">
      <span class="eyebrow">Blog</span>

      <h1>Não foi possível carregar o artigo.</h1>

      <p>Ocorreu um erro ao carregar este conteúdo. Tente novamente mais tarde.</p>

      <RouterLink to="/blog" class="cta-button"> Voltar para o blog </RouterLink>
    </div>
  </main>

  <!-- ARTIGO NÃO ENCONTRADO -->
  <main v-else-if="notFound" class="not-found">
    <div class="container">
      <span class="eyebrow">Blog</span>

      <h1>Artigo não encontrado.</h1>

      <RouterLink to="/blog" class="cta-button"> Voltar para o blog </RouterLink>
    </div>
  </main>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//import { useHead } from '@unhead/vue'

const supabase = useSupabaseClient()

const route = useRoute()
const router = useRouter()

/*
|--------------------------------------------------------------------------
| ESTADO
|--------------------------------------------------------------------------
*/

const post = ref(null)
const loading = ref(true)

const notFound = ref(false)
const loadError = ref(null)

/*
|--------------------------------------------------------------------------
| CARREGAR POST
|--------------------------------------------------------------------------
*/

async function loadPost() {
  loading.value = true
  notFound.value = false
  loadError.value = null

  try {
    const slug = route.params.slug

    console.log('Carregando artigo com slug:', slug)

    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        status,
        published_at,
        created_at,
        categories (
          id,
          name
        )
      `,
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (supabaseError) {
      console.error('Erro ao carregar artigo:', supabaseError)

      loadError.value = supabaseError.message
      post.value = null

      return
    }

    if (!data) {
      console.warn('Artigo não encontrado para o slug:', slug)

      notFound.value = true
      post.value = null

      return
    }

    let content = []

    try {
      if (typeof data.content === 'string') {
        content = JSON.parse(data.content)
      } else if (Array.isArray(data.content)) {
        content = data.content
      }
    } catch (parseError) {
      console.error('Erro ao interpretar conteúdo do artigo:', parseError)

      content = []
    }

    post.value = {
      ...data,

      category: data.categories?.name || 'Tecnologia',

      author: 'Code Experts Sistemas',

      date: formatDate(data.published_at || data.created_at),

      readingTime: calculateReadingTime(content),

      content,
    }
  } catch (unexpectedError) {
    console.error('Erro inesperado ao carregar artigo:', unexpectedError)

    loadError.value = unexpectedError?.message || String(unexpectedError)

    post.value = null
  } finally {
    loading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| FORMATAR DATA
|--------------------------------------------------------------------------
*/

function formatDate(date) {
  if (!date) return ''

  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/*
|--------------------------------------------------------------------------
| CALCULAR TEMPO DE LEITURA
|--------------------------------------------------------------------------
*/

function calculateReadingTime(content) {
  const text = content.map((block) => block.content || block.text || '').join(' ')

  const words = text.trim().split(/\s+/).filter(Boolean).length

  const minutes = Math.max(1, Math.ceil(words / 200))

  return `${minutes} min de leitura`
}

/*
|--------------------------------------------------------------------------
| CARREGAR
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  try {
    await router.isReady()

    if (typeof window !== 'undefined') {
      window.prerenderReady = false
    }

    await loadPost()

    await nextTick()
  } catch (e) {
    console.error('Erro no ciclo de carregamento da página:', e)
  } finally {
    /*
    |--------------------------------------------------------------------------
    | PRERENDER
    |--------------------------------------------------------------------------
    */

    if (typeof window !== 'undefined') {
      window.prerenderReady = true
    }
  }
})

/*
|--------------------------------------------------------------------------
| SEO
|--------------------------------------------------------------------------
*/

useHead(() => {
  if (loading.value) {
    return {
      title: 'Carregando artigo | Code Experts Sistemas',
    }
  }

  if (notFound.value) {
    return {
      title: 'Artigo não encontrado | Code Experts Sistemas',

      meta: [
        {
          name: 'robots',
          content: 'noindex, nofollow',
        },
      ],
    }
  }

  if (loadError.value || !post.value) {
    return {
      title: 'Code Experts Sistemas',
    }
  }

  const url = `https://codeexpertssistemas.com.br/blog/${post.value.slug}`

  return {
    title: `${post.value.title} | Code Experts Sistemas`,

    meta: [
      {
        name: 'description',
        content: post.value.excerpt,
      },

      {
        property: 'og:title',
        content: post.value.title,
      },

      {
        property: 'og:description',
        content: post.value.excerpt,
      },

      {
        property: 'og:type',
        content: 'article',
      },

      {
        property: 'og:url',
        content: url,
      },

      {
        property: 'og:site_name',
        content: 'Code Experts Sistemas',
      },

      {
        property: 'article:author',
        content: post.value.author,
      },

      {
        property: 'article:section',
        content: post.value.category,
      },
    ],

    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  }
})
</script>

<style scoped>
.post-page {
  background: var(--color-background);
}

/* =========================================================
   HERO
========================================================= */

.post-hero {
  padding: 80px 0 70px;

  background: radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.12), transparent 35%);
}

.post-hero__content {
  max-width: 850px;
}

.back-link {
  display: inline-block;

  margin-bottom: 50px;

  color: var(--color-text-secondary);

  font-size: 14px;

  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-primary);
}

.eyebrow {
  display: block;

  color: var(--color-primary);

  font-size: 13px;
  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 1.5px;
}

.post-hero h1 {
  max-width: 850px;

  margin-top: 18px;

  font-size: clamp(40px, 6vw, 65px);

  line-height: 1.05;

  letter-spacing: -2.5px;
}

.post-excerpt {
  max-width: 720px;

  margin-top: 25px;

  color: var(--color-text-secondary);

  font-size: 19px;

  line-height: 1.7;
}

.post-meta {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: 30px;

  color: var(--color-text-secondary);

  font-size: 13px;
}

/* =========================================================
   CONTEÚDO
========================================================= */

.post-content-section {
  background: var(--color-background);
}

.post-content {
  max-width: 760px;

  margin: 0 auto;
}

.post-content p {
  margin-bottom: 24px;

  color: var(--color-text);

  font-size: 18px;

  line-height: 1.85;
}

.post-content h2 {
  margin-top: 50px;

  margin-bottom: 20px;

  font-size: 30px;

  line-height: 1.2;

  letter-spacing: -1px;
}

/* =========================================================
   CTA
========================================================= */

.post-cta {
  background: var(--color-background-secondary);
}

.post-cta__content {
  max-width: 850px;

  text-align: center;
}

.post-cta h2 {
  margin-top: 15px;

  font-size: clamp(34px, 5vw, 55px);

  line-height: 1.1;

  letter-spacing: -2px;
}

.post-cta h2 span {
  display: block;

  color: var(--color-primary);
}

.post-cta p {
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
}

.cta-button span {
  font-size: 18px;
}

/* =========================================================
   NOT FOUND / LOADING
========================================================= */

.not-found {
  padding: 150px 0;

  text-align: center;
}

.not-found h1 {
  margin-top: 15px;

  font-size: 45px;
}

.not-found p {
  max-width: 600px;

  margin: 20px auto 0;

  color: var(--color-text-secondary);

  line-height: 1.7;
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {
  .post-hero {
    padding: 65px 0 55px;
  }

  .post-hero h1 {
    letter-spacing: -2px;
  }

  .post-content p {
    font-size: 17px;
  }
}
</style>
