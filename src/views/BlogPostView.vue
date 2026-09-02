<template>
  <main v-if="post" class="post-page">
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
            <p v-if="block.type === 'paragraph'">
              {{ block.text }}
            </p>

            <h2 v-if="block.type === 'heading'">
              {{ block.text }}
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

  <!-- ARTIGO NÃO ENCONTRADO -->
  <main v-else class="not-found">
    <div class="container">
      <span class="eyebrow"> Blog </span>

      <h1>Artigo não encontrado.</h1>

      <RouterLink to="/blog" class="cta-button"> Voltar para o blog </RouterLink>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

import { posts } from '@/data/posts'

const route = useRoute()

/*
 * Localiza o artigo através do slug da URL.
 *
 * Exemplo:
 * /blog/principais-problemas-ti-empresas
 *
 * route.params.slug:
 * principais-problemas-ti-empresas
 */
const post = computed(() => {
  return posts.find((post) => post.slug === route.params.slug)
})

/*
 * SEO DINÂMICO
 *
 * O conteúdo abaixo será alterado automaticamente
 * de acordo com o artigo que estiver sendo visualizado.
 */
useHead(() => {
  // Caso o artigo não exista
  if (!post.value) {
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

  const url = `https://codeexpertssistemas.com.br/blog/${post.value.slug}`

  return {
    title: `${post.value.title} | Code Experts Sistemas`,

    meta: [
      // Meta description
      {
        name: 'description',
        content: post.value.excerpt,
      },

      // Open Graph
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

      // Informações do artigo
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
      // URL canônica
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

/* HERO */

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

/* CONTEÚDO */

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

/* CTA */

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

/* NOT FOUND */

.not-found {
  padding: 150px 0;

  text-align: center;
}

.not-found h1 {
  margin-top: 15px;

  font-size: 45px;
}

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
