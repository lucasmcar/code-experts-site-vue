<template>
  <div class="posts-page">
    <!-- Cabeçalho -->
    <header class="page-header">
      <div>
        <span class="eyebrow">BLOG</span>

        <h1>Posts</h1>

        <p>Gerencie os conteúdos publicados e os rascunhos do blog.</p>
      </div>

      <button type="button" class="btn-primary" @click="createPost">
        <span>+</span>
        Novo post
      </button>
    </header>

    <!-- Resumo -->
    <section class="stats-grid">
      <article class="stat-card">
        <span class="stat-label">Total de posts</span>
        <strong>{{ totalPosts }}</strong>
      </article>

      <article class="stat-card">
        <span class="stat-label">Publicados</span>
        <strong>{{ publishedPosts }}</strong>
      </article>

      <article class="stat-card">
        <span class="stat-label">Rascunhos</span>
        <strong>{{ draftPosts }}</strong>
      </article>
    </section>

    <!-- Filtros -->
    <section class="filters">
      <div class="search-box">
        <label for="post-search">Pesquisar</label>

        <input
          id="post-search"
          v-model="search"
          type="search"
          placeholder="Buscar por título, slug ou resumo..."
        />
      </div>

      <div class="status-filter">
        <label for="status-filter">Status</label>

        <select id="status-filter" v-model="statusFilter">
          <option value="all">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>
      </div>
    </section>

    <!-- Erro -->
    <div v-if="error" class="message error-message">
      {{ error }}

      <button type="button" @click="loadPosts">Tentar novamente</button>
    </div>

    <!-- Carregando -->
    <div v-else-if="loading" class="loading-state">
      <div class="spinner"></div>

      <p>Carregando posts...</p>
    </div>

    <!-- Nenhum resultado -->
    <div v-else-if="filteredPosts.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>

      <h2>
        {{ search || statusFilter !== 'all' ? 'Nenhum post encontrado' : 'Nenhum post cadastrado' }}
      </h2>

      <p>
        {{
          search || statusFilter !== 'all'
            ? 'Tente alterar os filtros utilizados.'
            : 'Comece criando o primeiro post do blog.'
        }}
      </p>

      <button
        v-if="!search && statusFilter === 'all'"
        type="button"
        class="btn-primary"
        @click="createPost"
      >
        Criar primeiro post
      </button>
    </div>

    <!-- Tabela -->
    <section v-else class="posts-card">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Data</th>
              <th class="actions-column">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="post in filteredPosts" :key="post.id">
              <!-- Post -->
              <td class="post-cell">
                <div v-if="post.featured_image" class="post-image">
                  <img :src="post.featured_image" :alt="post.title" />
                </div>

                <div class="post-info">
                  <strong>{{ post.title }}</strong>

                  <span class="post-slug"> /blog/{{ post.slug }} </span>

                  <span v-if="post.excerpt" class="post-excerpt">
                    {{ post.excerpt }}
                  </span>
                </div>
              </td>

              <!-- Categoria -->
              <td>
                <span class="category">
                  {{ getCategoryName(post) }}
                </span>
              </td>

              <!-- Status -->
              <td>
                <span class="status" :class="`status-${post.status}`">
                  <span class="status-dot"></span>

                  {{ getStatusLabel(post.status) }}
                </span>
              </td>

              <!-- Data -->
              <td class="date-cell">
                {{
                  post.status === 'published'
                    ? formatDate(post.published_at)
                    : formatDate(post.updated_at || post.created_at)
                }}
              </td>

              <!-- Ações -->
              <td class="actions-cell">
                <button type="button" class="action-btn" title="Editar" @click="editPost(post.id)">
                  Editar
                </button>

                <button
                  v-if="post.status === 'published'"
                  type="button"
                  class="action-btn"
                  title="Visualizar"
                  @click="viewPost(post)"
                >
                  Ver
                </button>

                <button
                  type="button"
                  class="action-btn danger"
                  title="Excluir"
                  @click="deletePost(post)"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Rodapé da tabela -->
      <footer class="table-footer">
        <span>
          {{ filteredPosts.length }}
          {{ filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados' }}
        </span>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'

const router = useRouter()

const posts = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const statusFilter = ref('all')

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
        published_at,
        created_at,
        updated_at,
        categories (
          id,
          name
        )
      `,
      )
      .order('created_at', { ascending: false })

    if (supabaseError) {
      throw supabaseError
    }

    posts.value = data || []
  } catch (err) {
    console.error('Erro ao carregar posts:', err)
    error.value = 'Não foi possível carregar os posts.'
  } finally {
    loading.value = false
  }
}

const filteredPosts = computed(() => {
  const term = search.value.trim().toLowerCase()

  return posts.value.filter((post) => {
    const matchesSearch =
      !term ||
      post.title?.toLowerCase().includes(term) ||
      post.slug?.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term)

    const matchesStatus = statusFilter.value === 'all' || post.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const totalPosts = computed(() => posts.value.length)

const publishedPosts = computed(() => {
  return posts.value.filter((post) => post.status === 'published').length
})

const draftPosts = computed(() => {
  return posts.value.filter((post) => post.status === 'draft').length
})

function createPost() {
  router.push({ name: 'admin-post-new' })
}

function editPost(id) {
  router.push({
    name: 'admin-post-edit',
    params: { id },
  })
}

function viewPost(post) {
  if (!post.slug) return

  window.open(
    router.resolve({
      name: 'blog-post',
      params: { slug: post.slug },
    }).href,
    '_blank',
  )
}

async function deletePost(post) {
  const confirmed = window.confirm(`Tem certeza que deseja excluir o post "${post.title}"?`)

  if (!confirmed) return

  try {
    const { error: supabaseError } = await supabase.from('posts').delete().eq('id', post.id)

    if (supabaseError) {
      throw supabaseError
    }

    posts.value = posts.value.filter((item) => item.id !== post.id)
  } catch (err) {
    console.error('Erro ao excluir post:', err)
    window.alert('Não foi possível excluir o post.')
  }
}

function formatDate(date) {
  if (!date) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

function getCategoryName(post) {
  return post.categories?.name || 'Sem categoria'
}

function getStatusLabel(status) {
  return status === 'published' ? 'Publicado' : 'Rascunho'
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.posts-page {
  width: 100%;
}

/* =========================
   CABEÇALHO
========================= */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
}

.eyebrow {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-primary, #2563eb);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.page-header h1 {
  margin: 0;
  color: var(--color-text, #111827);
  font-size: 2rem;
  line-height: 1.2;
}

.page-header p {
  margin: 0.6rem 0 0;
  color: var(--color-text-muted, #6b7280);
}

/* =========================
   BOTÕES
========================= */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.7rem 1.1rem;
  border: 0;
  border-radius: 8px;
  background: var(--color-primary, #2563eb);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-primary span {
  font-size: 1.2rem;
  line-height: 1;
}

/* =========================
   ESTATÍSTICAS
========================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  padding: 1.25rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 10px;
  background: var(--color-surface, #fff);
}

.stat-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-muted, #6b7280);
  font-size: 0.85rem;
}

.stat-card strong {
  display: block;
  color: var(--color-text, #111827);
  font-size: 1.7rem;
  line-height: 1;
}

/* =========================
   FILTROS
========================= */

.filters {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 10px;
  background: var(--color-surface, #fff);
}

.search-box {
  flex: 1;
}

.status-filter {
  width: 190px;
}

.filters label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--color-text, #111827);
  font-size: 0.8rem;
  font-weight: 600;
}

.filters input,
.filters select {
  width: 100%;
  height: 42px;
  padding: 0 0.8rem;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 7px;
  background: var(--color-background, #fff);
  color: var(--color-text, #111827);
  font: inherit;
  outline: none;
}

.filters input:focus,
.filters select:focus {
  border-color: var(--color-primary, #2563eb);
}

/* =========================
   TABELA
========================= */

.posts-card {
  overflow: hidden;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 10px;
  background: var(--color-surface, #fff);
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
}

thead {
  background: var(--color-background-secondary, #f9fafb);
}

th {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  color: var(--color-text-muted, #6b7280);
  font-size: 0.75rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

td {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: 0;
}

tbody tr:hover {
  background: var(--color-background-secondary, #fafafa);
}

/* =========================
   POST
========================= */

.post-cell {
  min-width: 340px;
}

.post-cell {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.post-image {
  flex: 0 0 64px;
  width: 64px;
  height: 48px;
  overflow: hidden;
  border-radius: 6px;
  background: #f3f4f6;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-info {
  min-width: 0;
}

.post-info strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--color-text, #111827);
  font-size: 0.9rem;
  font-weight: 600;
}

.post-slug {
  display: block;
  margin-bottom: 0.25rem;
  overflow: hidden;
  color: var(--color-text-muted, #6b7280);
  font-family: monospace;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-excerpt {
  display: block;
  max-width: 400px;
  overflow: hidden;
  color: var(--color-text-muted, #6b7280);
  font-size: 0.78rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =========================
   CATEGORIA
========================= */

.category {
  display: inline-block;
  padding: 0.35rem 0.6rem;
  border-radius: 5px;
  background: var(--color-background-secondary, #f3f4f6);
  color: var(--color-text, #374151);
  font-size: 0.75rem;
}

/* =========================
   STATUS
========================= */

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.status-published {
  color: #15803d;
}

.status-draft {
  color: #a16207;
}

/* =========================
   DATA
========================= */

.date-cell {
  color: var(--color-text-muted, #6b7280);
  font-size: 0.8rem;
  white-space: nowrap;
}

/* =========================
   AÇÕES
========================= */

.actions-column {
  text-align: right;
}

.actions-cell {
  white-space: nowrap;
  text-align: right;
}

.action-btn {
  margin-left: 0.35rem;
  padding: 0.45rem 0.65rem;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--color-primary, #2563eb);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.action-btn:hover {
  background: var(--color-background-secondary, #f3f4f6);
}

.action-btn.danger {
  color: #dc2626;
}

.action-btn.danger:hover {
  background: #fef2f2;
}

/* =========================
   RODAPÉ
========================= */

.table-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
  color: var(--color-text-muted, #6b7280);
  font-size: 0.78rem;
}

/* =========================
   LOADING
========================= */

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  color: var(--color-text-muted, #6b7280);
}

.spinner {
  width: 30px;
  height: 30px;
  margin-bottom: 1rem;
  border: 3px solid var(--color-border, #e5e7eb);
  border-top-color: var(--color-primary, #2563eb);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================
   MENSAGENS
========================= */

.message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
}

.error-message {
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #991b1b;
}

.error-message button {
  padding: 0.4rem 0.7rem;
  border: 1px solid #fca5a5;
  border-radius: 5px;
  background: transparent;
  color: #991b1b;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

/* =========================
   VAZIO
========================= */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  border: 1px dashed var(--color-border, #d1d5db);
  border-radius: 10px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.empty-state h2 {
  margin: 0 0 0.5rem;
  color: var(--color-text, #111827);
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted, #6b7280);
  font-size: 0.85rem;
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 800px) {
  .page-header {
    align-items: stretch;
    flex-direction: column;
  }

  .page-header .btn-primary {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    align-items: stretch;
    flex-direction: column;
  }

  .status-filter {
    width: 100%;
  }
}
</style>
