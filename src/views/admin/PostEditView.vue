<template>
  <div class="post-edit-page">
    <!-- =========================
         LOADING
    ========================== -->

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>

      <p>Carregando post...</p>
    </div>

    <!-- =========================
         ERRO DE CARREGAMENTO
    ========================== -->

    <div v-else-if="error && !title" class="error-state">
      <h1>Não foi possível carregar o post</h1>

      <p>{{ error }}</p>

      <button type="button" class="btn-secondary" @click="cancel">Voltar para posts</button>
    </div>

    <!-- =========================
         EDITOR
    ========================== -->

    <template v-else>
      <!-- Cabeçalho -->

      <header class="page-header">
        <div>
          <span class="eyebrow">BLOG</span>

          <h1>Editar post</h1>

          <p>Altere as informações e o conteúdo do artigo.</p>
        </div>

        <button type="button" class="btn-secondary" @click="cancel">Voltar</button>
      </header>

      <!-- Mensagens -->

      <div v-if="error" class="message error-message">
        {{ error }}
      </div>

      <div v-if="success" class="message success-message">
        {{ success }}
      </div>

      <!-- =========================
           INFORMAÇÕES PRINCIPAIS
      ========================== -->

      <section class="editor-card">
        <div class="section-header">
          <div>
            <h2>Informações do post</h2>

            <p>Dados principais utilizados no blog e no SEO.</p>
          </div>
        </div>

        <div class="form-grid">
          <!-- Título -->

          <div class="form-group full-width">
            <label for="title"> Título </label>

            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="Ex.: Como a tecnologia pode ajudar pequenas empresas"
            />
          </div>

          <!-- Slug -->

          <div class="form-group full-width">
            <label for="slug"> Slug </label>

            <input
              id="slug"
              v-model="slug"
              type="text"
              placeholder="como-a-tecnologia-pode-ajudar-pequenas-empresas"
            />

            <small> URL: /blog/{{ slugPreview }} </small>
          </div>

          <!-- Resumo -->

          <div class="form-group full-width">
            <label for="excerpt"> Resumo </label>

            <textarea
              id="excerpt"
              v-model="excerpt"
              rows="3"
              placeholder="Breve descrição do conteúdo..."
            ></textarea>
          </div>

          <!-- Categoria -->

          <div class="form-group">
            <label for="category"> Categoria </label>

            <select id="category" v-model="categoryId">
              <option value="">Selecione uma categoria</option>

              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Status -->

          <div class="form-group">
            <label for="status"> Status </label>

            <select id="status" v-model="status">
              <option value="draft">Rascunho</option>

              <option value="published">Publicado</option>
            </select>
          </div>

          <!-- Imagem -->

          <div class="form-group full-width">
            <label for="featured-image"> Imagem destacada </label>

            <input
              id="featured-image"
              v-model="featuredImage"
              type="url"
              placeholder="https://..."
            />

            <small> Informe a URL da imagem destacada. </small>

            <div v-if="featuredImage" class="image-preview">
              <img :src="featuredImage" alt="Pré-visualização da imagem destacada" />

              <span>Pré-visualização</span>
            </div>
          </div>
        </div>
      </section>

      <!-- =========================
           CONTEÚDO
      ========================== -->

      <section class="editor-card">
        <div class="section-header content-header">
          <div>
            <h2>Conteúdo</h2>

            <p>Organize o conteúdo do artigo utilizando blocos.</p>
          </div>

          <div class="add-buttons">
            <button type="button" class="btn-outline" @click="addHeading">+ Título</button>

            <button type="button" class="btn-outline" @click="addParagraph">+ Parágrafo</button>
          </div>
        </div>

        <!-- Sem conteúdo -->

        <div v-if="content.length === 0" class="content-empty">
          <div class="empty-icon">📝</div>

          <h3>Este post ainda não possui conteúdo</h3>

          <p>Adicione um título ou um parágrafo para começar.</p>

          <div class="add-buttons">
            <button type="button" class="btn-outline" @click="addHeading">+ Título</button>

            <button type="button" class="btn-outline" @click="addParagraph">+ Parágrafo</button>
          </div>
        </div>

        <!-- Blocos -->

        <div v-else class="content-blocks">
          <article v-for="(block, index) in content" :key="index" class="content-block">
            <div class="block-header">
              <strong>
                {{ block.type === 'heading' ? 'Título' : 'Parágrafo' }}
              </strong>

              <div class="block-actions">
                <button
                  type="button"
                  title="Mover para cima"
                  :disabled="index === 0"
                  @click="moveBlockUp(index)"
                >
                  ↑
                </button>

                <button
                  type="button"
                  title="Mover para baixo"
                  :disabled="index === content.length - 1"
                  @click="moveBlockDown(index)"
                >
                  ↓
                </button>

                <button
                  type="button"
                  class="delete-block"
                  title="Remover bloco"
                  @click="removeBlock(index)"
                >
                  ×
                </button>
              </div>
            </div>

            <!-- Heading -->

            <input
              v-if="block.type === 'heading'"
              v-model="block.content"
              type="text"
              placeholder="Digite o título da seção..."
            />

            <!-- Paragraph -->

            <textarea
              v-else
              v-model="block.content"
              rows="5"
              placeholder="Digite o conteúdo do parágrafo..."
            ></textarea>
          </article>
        </div>
      </section>

      <!-- =========================
           AÇÕES
      ========================== -->

      <footer class="editor-actions">
        <button type="button" class="btn-secondary" :disabled="saving" @click="cancel">
          Cancelar
        </button>

        <div class="save-actions">
          <button type="button" class="btn-secondary" :disabled="saving" @click="savePost('draft')">
            {{ saving ? 'Salvando...' : 'Salvar rascunho' }}
          </button>

          <button
            type="button"
            class="btn-primary"
            :disabled="saving"
            @click="savePost('published')"
          >
            {{ saving ? 'Salvando...' : 'Publicar' }}
          </button>
        </div>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'

const route = useRoute()
const router = useRouter()

const postId = route.params.id

const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')

const categories = ref([])

const title = ref('')
const slug = ref('')
const excerpt = ref('')
const categoryId = ref('')
const featuredImage = ref('')
const status = ref('draft')

const content = ref([])

/*
|--------------------------------------------------------------------------
| Categorias
|--------------------------------------------------------------------------
*/

async function loadCategories() {
  const { data, error: supabaseError } = await supabase
    .from('categories')
    .select('id, name')
    .order('name')

  if (supabaseError) {
    throw supabaseError
  }

  categories.value = data || []
}

/*
|--------------------------------------------------------------------------
| Post
|--------------------------------------------------------------------------
*/

async function loadPost() {
  const { data, error: supabaseError } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      content,
      category_id,
      featured_image,
      status,
      published_at
    `,
    )
    .eq('id', postId)
    .single()

  if (supabaseError) {
    throw supabaseError
  }

  if (!data) {
    throw new Error('Post não encontrado.')
  }

  title.value = data.title || ''
  slug.value = data.slug || ''
  excerpt.value = data.excerpt || ''
  categoryId.value = data.category_id || ''
  featuredImage.value = data.featured_image || ''
  status.value = data.status || 'draft'

  /*
   * O conteúdo foi salvo como JSON no banco.
   * Aceitamos tanto string quanto objeto/array,
   * deixando a tela mais resistente caso algum
   * post antigo tenha outro formato.
   */
  if (typeof data.content === 'string') {
    try {
      content.value = JSON.parse(data.content)
    } catch {
      content.value = [
        {
          type: 'paragraph',
          content: data.content,
        },
      ]
    }
  } else if (Array.isArray(data.content)) {
    content.value = data.content
  } else {
    content.value = []
  }
}

/*
|--------------------------------------------------------------------------
| Slug
|--------------------------------------------------------------------------
*/

function generateSlug(value) {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const slugPreview = computed(() => {
  return slug.value || generateSlug(title.value)
})

/*
|--------------------------------------------------------------------------
| Conteúdo
|--------------------------------------------------------------------------
*/

function addParagraph() {
  content.value.push({
    type: 'paragraph',
    content: '',
  })
}

function addHeading() {
  content.value.push({
    type: 'heading',
    content: '',
  })
}

function removeBlock(index) {
  content.value.splice(index, 1)
}

function moveBlockUp(index) {
  if (index <= 0) return

  const block = content.value[index]

  content.value.splice(index, 1)
  content.value.splice(index - 1, 0, block)
}

function moveBlockDown(index) {
  if (index >= content.value.length - 1) return

  const block = content.value[index]

  content.value.splice(index, 1)
  content.value.splice(index + 1, 0, block)
}

/*
|--------------------------------------------------------------------------
| Validação
|--------------------------------------------------------------------------
*/

function validateForm() {
  if (!title.value.trim()) {
    error.value = 'Informe o título do post.'
    return false
  }

  if (!excerpt.value.trim()) {
    error.value = 'Informe o resumo do post.'
    return false
  }

  if (!categoryId.value) {
    error.value = 'Selecione uma categoria.'
    return false
  }

  if (!content.value.length) {
    error.value = 'Adicione pelo menos um bloco de conteúdo.'
    return false
  }

  const hasEmptyBlock = content.value.some((block) => !block.content?.trim())

  if (hasEmptyBlock) {
    error.value = 'Preencha todos os blocos de conteúdo.'
    return false
  }

  return true
}

/*
|--------------------------------------------------------------------------
| Salvar
|--------------------------------------------------------------------------
*/

async function savePost(newStatus = status.value) {
  error.value = ''
  success.value = ''

  if (!validateForm()) return

  saving.value = true

  try {
    const finalSlug = slug.value.trim() || generateSlug(title.value)

    const publishedAt = newStatus === 'published' ? new Date().toISOString() : null

    const { error: supabaseError } = await supabase
      .from('posts')
      .update({
        title: title.value.trim(),
        slug: finalSlug,
        excerpt: excerpt.value.trim(),
        content: JSON.stringify(content.value),
        category_id: categoryId.value,
        featured_image: featuredImage.value.trim() || null,
        status: newStatus,
        published_at: publishedAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)

    if (supabaseError) {
      throw supabaseError
    }

    status.value = newStatus

    success.value =
      newStatus === 'published' ? 'Post publicado com sucesso.' : 'Rascunho salvo com sucesso.'

    /*
     * Retorna para a lista depois de salvar.
     */
    setTimeout(() => {
      router.push({ name: 'admin-posts' })
    }, 700)
  } catch (err) {
    console.error('Erro ao atualizar post:', err)

    if (err.code === '23505') {
      error.value = 'Já existe outro post utilizando este slug.'
    } else {
      error.value = 'Não foi possível salvar o post.'
    }
  } finally {
    saving.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Cancelar
|--------------------------------------------------------------------------
*/

function cancel() {
  router.push({ name: 'admin-posts' })
}

/*
|--------------------------------------------------------------------------
| Inicialização
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  loading.value = true
  error.value = ''

  try {
    await Promise.all([loadCategories(), loadPost()])
  } catch (err) {
    console.error('Erro ao carregar editor:', err)
    error.value = 'Não foi possível carregar o post.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.post-edit-page {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
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
   CARDS
========================= */

.editor-card {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 10px;
  background: var(--color-surface, #fff);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: var(--color-text, #111827);
  font-size: 1.1rem;
}

.section-header p {
  margin: 0.4rem 0 0;
  color: var(--color-text-muted, #6b7280);
  font-size: 0.8rem;
}

/* =========================
   FORMULÁRIO
========================= */

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.form-group {
  min-width: 0;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--color-text, #111827);
  font-size: 0.8rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 7px;
  background: var(--color-background, #fff);
  color: var(--color-text, #111827);
  font: inherit;
  outline: none;
}

.form-group input,
.form-group select {
  height: 42px;
}

.form-group textarea {
  resize: vertical;
  line-height: 1.5;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--color-primary, #2563eb);
}

.form-group small {
  display: block;
  margin-top: 0.4rem;
  color: var(--color-text-muted, #6b7280);
  font-size: 0.72rem;
}

/* =========================
   IMAGEM
========================= */

.image-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 7px;
  background: var(--color-background-secondary, #f9fafb);
}

.image-preview img {
  width: 120px;
  height: 75px;
  border-radius: 5px;
  object-fit: cover;
}

.image-preview span {
  color: var(--color-text-muted, #6b7280);
  font-size: 0.75rem;
}

/* =========================
   CONTEÚDO
========================= */

.content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.add-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-outline {
  min-height: 38px;
  padding: 0.55rem 0.8rem;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 7px;
  background: transparent;
  color: var(--color-text, #374151);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-outline:hover {
  border-color: var(--color-primary, #2563eb);
  color: var(--color-primary, #2563eb);
}

.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.content-block {
  padding: 1rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 8px;
  background: var(--color-background-secondary, #fafafa);
}

.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.block-header strong {
  color: var(--color-text, #374151);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.block-actions {
  display: flex;
  gap: 0.25rem;
}

.block-actions button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 5px;
  background: var(--color-surface, #fff);
  color: var(--color-text-muted, #6b7280);
  cursor: pointer;
}

.block-actions button:hover:not(:disabled) {
  border-color: var(--color-primary, #2563eb);
  color: var(--color-primary, #2563eb);
}

.block-actions button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.block-actions .delete-block:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.content-block input,
.content-block textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  font: inherit;
  outline: none;
}

.content-block textarea {
  resize: vertical;
  line-height: 1.6;
}

.content-block input:focus,
.content-block textarea:focus {
  border-color: var(--color-primary, #2563eb);
}

/* =========================
   VAZIO
========================= */

.content-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  border: 1px dashed var(--color-border, #d1d5db);
  border-radius: 8px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 0.75rem;
  font-size: 2rem;
}

.content-empty h3 {
  margin: 0 0 0.4rem;
  color: var(--color-text, #111827);
  font-size: 1rem;
}

.content-empty p {
  margin: 0 0 1rem;
  color: var(--color-text-muted, #6b7280);
  font-size: 0.8rem;
}

/* =========================
   AÇÕES
========================= */

.editor-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 2rem;
}

.save-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary {
  min-height: 42px;
  padding: 0.65rem 1rem;
  border-radius: 7px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  border: 0;
  background: var(--color-primary, #2563eb);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-secondary {
  border: 1px solid var(--color-border, #d1d5db);
  background: var(--color-surface, #fff);
  color: var(--color-text, #374151);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--color-primary, #2563eb);
  color: var(--color-primary, #2563eb);
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* =========================
   MENSAGENS
========================= */

.message {
  margin-bottom: 1.5rem;
  padding: 0.9rem 1rem;
  border-radius: 7px;
  font-size: 0.8rem;
}

.error-message {
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #991b1b;
}

.success-message {
  border: 1px solid #bbf7d0;
  background: #f0fdf4;
  color: #166534;
}

/* =========================
   LOADING
========================= */

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--color-text-muted, #6b7280);
}

.spinner {
  width: 32px;
  height: 32px;
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
   ERRO
========================= */

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.error-state h1 {
  margin: 0 0 0.5rem;
  color: var(--color-text, #111827);
  font-size: 1.4rem;
}

.error-state p {
  margin: 0 0 1.5rem;
  color: var(--color-text-muted, #6b7280);
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 700px) {
  .page-header {
    align-items: stretch;
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .content-header {
    flex-direction: column;
  }

  .editor-actions {
    align-items: stretch;
    flex-direction: column-reverse;
  }

  .save-actions {
    width: 100%;
    flex-direction: column;
  }

  .save-actions button,
  .editor-actions > button {
    width: 100%;
  }
}
</style>
