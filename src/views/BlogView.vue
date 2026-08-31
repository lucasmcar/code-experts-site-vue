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

        <div class="posts-grid">
          <article v-for="post in posts" :key="post.id" class="post-card">
            <div class="post-card__category">
              {{ post.category }}
            </div>

            <div class="post-card__body">
              <div class="post-card__meta">
                <span>{{ post.date }}</span>
                <span>•</span>
                <span>{{ post.readingTime }}</span>
              </div>

              <h3>
                {{ post.title }}
              </h3>

              <p>
                {{ post.excerpt }}
              </p>

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

        <h2>Seu problema pode ter uma <span>solução tecnológica.</span></h2>

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
import { posts } from '@/data/posts'
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
  flex-direction: column;

  flex: 1;

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
}
</style>
