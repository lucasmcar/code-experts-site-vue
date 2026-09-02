<template>
  <main class="admin-page">
    <header class="admin-header">
      <div class="container admin-header__content">
        <RouterLink to="/" class="admin-logo"> Code Experts Sistemas </RouterLink>

        <div class="admin-user">
          <span> Administração </span>

          <button @click="logout" class="logout-button">Sair</button>
        </div>
      </div>
    </header>

    <section class="admin-content">
      <div class="container">
        <div class="page-heading">
          <div>
            <span class="eyebrow"> Dashboard </span>

            <h1>Olá, seja bem-vindo.</h1>

            <p>Gerencie os conteúdos do blog da Code Experts Sistemas.</p>
          </div>

          <RouterLink to="/admin/posts/new" class="primary-button"> + Novo artigo </RouterLink>
        </div>

        <!-- ESTATÍSTICAS -->

        <div class="stats-grid">
          <div class="stat-card">
            <span> Artigos </span>

            <strong>
              {{ posts.length }}
            </strong>
          </div>

          <div class="stat-card">
            <span> Publicados </span>

            <strong>
              {{ publishedPosts }}
            </strong>
          </div>

          <div class="stat-card">
            <span> Rascunhos </span>

            <strong>
              {{ draftPosts }}
            </strong>
          </div>
        </div>

        <!-- ARTIGOS -->

        <section class="posts-section">
          <div class="section-title">
            <div>
              <span class="eyebrow"> Conteúdo </span>

              <h2>Artigos recentes</h2>
            </div>

            <RouterLink to="/admin/posts" class="view-all"> Ver todos → </RouterLink>
          </div>

          <div class="posts-table">
            <div v-for="post in posts" :key="post.id" class="post-row">
              <div class="post-info">
                <h3>
                  {{ post.title }}
                </h3>

                <span>
                  {{ post.category }}
                </span>
              </div>

              <div class="post-status">
                <span :class="['status', post.status]">
                  {{ post.status === 'published' ? 'Publicado' : 'Rascunho' }}
                </span>
              </div>

              <RouterLink :to="`/admin/posts/${post.id}/edit`" class="edit-button">
                Editar
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/services/supabase'
import { posts } from '@/data/posts'

const router = useRouter()

const publishedPosts = computed(() => posts.filter((post) => post.status === 'published').length)

const draftPosts = computed(() => posts.filter((post) => post.status === 'draft').length)

const logout = async () => {
  await supabase.auth.signOut()

  router.push('/admin/login')
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;

  background: var(--color-background-secondary);
}

/* HEADER */

.admin-header {
  border-bottom: 1px solid var(--color-border);

  background: var(--color-background);
}

.admin-header__content {
  min-height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-logo {
  color: var(--color-text);

  font-size: 18px;
  font-weight: 800;
}

.admin-user {
  display: flex;
  align-items: center;

  gap: 20px;

  color: var(--color-text-secondary);

  font-size: 13px;
}

.logout-button {
  padding: 8px 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: transparent;

  color: var(--color-text);

  font-size: 13px;

  cursor: pointer;
}

/* CONTENT */

.admin-content {
  padding: 60px 0;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;
}

.eyebrow {
  color: var(--color-primary);

  font-size: 12px;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.page-heading h1 {
  margin-top: 10px;

  font-size: clamp(32px, 4vw, 45px);

  letter-spacing: -1.5px;
}

.page-heading p {
  margin-top: 10px;

  color: var(--color-text-secondary);

  font-size: 15px;
}

/* BUTTON */

.primary-button {
  display: inline-flex;

  padding: 12px 18px;

  border-radius: var(--radius-md);

  background: var(--color-primary);

  color: white;

  font-size: 13px;
  font-weight: 700;

  white-space: nowrap;
}

/* STATS */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;

  margin-top: 45px;
}

.stat-card {
  padding: 25px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);
}

.stat-card span {
  color: var(--color-text-secondary);

  font-size: 13px;
}

.stat-card strong {
  display: block;

  margin-top: 12px;

  font-size: 35px;
}

/* POSTS */

.posts-section {
  margin-top: 60px;
}

.section-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-bottom: 25px;
}

.section-title h2 {
  margin-top: 10px;

  font-size: 27px;

  letter-spacing: -0.5px;
}

.view-all {
  color: var(--color-primary);

  font-size: 13px;
  font-weight: 700;
}

.posts-table {
  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);
}

.post-row {
  display: grid;

  grid-template-columns: 1fr 150px 80px;

  align-items: center;

  gap: 20px;

  padding: 22px 25px;

  border-bottom: 1px solid var(--color-border);
}

.post-row:last-child {
  border-bottom: 0;
}

.post-info h3 {
  font-size: 15px;
}

.post-info span {
  display: block;

  margin-top: 5px;

  color: var(--color-text-secondary);

  font-size: 12px;
}

.status {
  display: inline-block;

  padding: 6px 10px;

  border-radius: 999px;

  font-size: 11px;
  font-weight: 700;
}

.status.published {
  background: rgba(22, 163, 74, 0.1);

  color: #16a34a;
}

.status.draft {
  background: rgba(234, 179, 8, 0.1);

  color: #ca8a04;
}

.edit-button {
  color: var(--color-primary);

  font-size: 13px;
  font-weight: 700;

  text-align: right;
}

@media (max-width: 700px) {
  .admin-content {
    padding: 40px 0;
  }

  .page-heading {
    align-items: flex-start;

    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .post-row {
    grid-template-columns: 1fr;

    gap: 12px;
  }

  .edit-button {
    text-align: left;
  }
}
</style>
