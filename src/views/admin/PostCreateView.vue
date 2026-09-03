<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'

const router = useRouter()

const title = ref('')
const slug = ref('')
const excerpt = ref('')
const categoryId = ref('')
const featuredImage = ref('')
const status = ref('draft')
const content = ref([])

const categories = ref([])

const loading = ref(false)
const loadingCategories = ref(true)
const error = ref('')
const success = ref('')

/*
|--------------------------------------------------------------------------
| Gerar slug
|--------------------------------------------------------------------------
*/

function generateSlug(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function updateSlug() {
  slug.value = generateSlug(title.value)
}

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
  if (index === 0) return

  const block = content.value[index]

  content.value.splice(index, 1)
  content.value.splice(index - 1, 0, block)
}

function moveBlockDown(index) {
  if (index === content.value.length - 1) return

  const block = content.value[index]

  content.value.splice(index, 1)
  content.value.splice(index + 1, 0, block)
}

/*
|--------------------------------------------------------------------------
| Categorias
|--------------------------------------------------------------------------
*/

async function loadCategories() {
  loadingCategories.value = true

  const { data, error: categoryError } = await supabase
    .from('categories')
    .select('id, name')
    .order('name')

  if (categoryError) {
    error.value = 'Não foi possível carregar as categorias.'
    console.error(categoryError)
  } else {
    categories.value = data || []
  }

  loadingCategories.value = false
}

/*
|--------------------------------------------------------------------------
| Usuário / Profile
|--------------------------------------------------------------------------
*/

async function getProfileId() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuário não autenticado.')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('auth_user_id', user.id)
    .single()

  if (profileError) {
    console.error(profileError)
    throw new Error('Perfil do administrador não encontrado.')
  }

  return profile.id
}

/*
|--------------------------------------------------------------------------
| Salvar artigo
|--------------------------------------------------------------------------
*/

const saveDraft = () => {
  status.value = 'draft'
  savePost()
}

const post = () => {
  status.value = 'published'
  savePost()
}

async function savePost() {
  error.value = ''
  success.value = ''

  if (!title.value.trim()) {
    error.value = 'Digite o título do artigo.'
    return
  }

  if (!excerpt.value.trim()) {
    error.value = 'Digite o resumo do artigo.'
    return
  }

  if (!categoryId.value) {
    error.value = 'Selecione uma categoria.'
    return
  }

  if (content.value.length === 0) {
    error.value = 'Adicione pelo menos um bloco de conteúdo.'
    return
  }

  const hasEmptyBlock = content.value.some((block) => !block.content.trim())

  if (hasEmptyBlock) {
    error.value = 'Preencha todos os blocos de conteúdo.'
    return
  }

  loading.value = true

  try {
    const authorId = await getProfileId()

    const postData = {
      title: title.value.trim(),
      slug: slug.value.trim(),
      excerpt: excerpt.value.trim(),
      content: JSON.stringify(content.value),
      category_id: categoryId.value,
      author_id: authorId,
      featured_image: featuredImage.value.trim() || null,
      status: status.value,
      published_at: status.value === 'published' ? new Date().toISOString() : null,
    }

    const { error: insertError } = await supabase.from('posts').insert(postData)

    if (insertError) {
      console.error(insertError)
      throw new Error(insertError.message)
    }

    success.value = 'Artigo salvo com sucesso!'

    setTimeout(() => {
      router.push('/admin/posts')
    }, 800)
  } catch (err) {
    console.error(err)
    error.value = err.message || 'Erro ao salvar o artigo.'
  } finally {
    loading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Inicialização
|--------------------------------------------------------------------------
*/

onMounted(() => {
  loadCategories()
})
</script>

<template>
  <div class="post-create-page">
    <!-- Header -->

    <header class="page-header">
      <div>
        <button class="back-button" type="button" @click="router.push('/admin/posts')">
          ← Voltar
        </button>

        <h1>Novo artigo</h1>

        <p>Crie um novo artigo para o blog da Code Experts Sistemas.</p>
      </div>

      <div class="header-actions">
        <button type="button" class="button secondary" :disabled="loading" @click="saveDraft">
          Salvar rascunho
        </button>

        <button type="button" class="button primary" :disabled="loading" @click="savePost">
          {{ loading ? 'Salvando...' : 'Publicar artigo' }}
        </button>
      </div>
    </header>

    <!-- Mensagens -->

    <div v-if="error" class="message error">
      {{ error }}
    </div>

    <div v-if="success" class="message success">
      {{ success }}
    </div>

    <!-- Conteúdo -->

    <div class="editor-layout">
      <!-- Editor principal -->

      <main class="editor-main">
        <section class="editor-card">
          <label for="title"> Título </label>

          <input
            id="title"
            v-model="title"
            type="text"
            class="title-input"
            placeholder="Digite o título do artigo"
            @input="updateSlug"
          />

          <label for="slug"> Slug </label>

          <input
            id="slug"
            v-model="slug"
            type="text"
            class="input"
            placeholder="titulo-do-artigo"
          />

          <label for="excerpt"> Resumo </label>

          <textarea
            id="excerpt"
            v-model="excerpt"
            class="textarea"
            rows="4"
            placeholder="Escreva um breve resumo do artigo..."
          />
        </section>

        <!-- Conteúdo -->

        <section class="editor-card">
          <div class="section-header">
            <div>
              <h2>Conteúdo</h2>

              <p>Monte o artigo adicionando títulos e parágrafos.</p>
            </div>
          </div>

          <div v-if="content.length === 0" class="empty-content">
            <p>Seu artigo ainda não possui conteúdo.</p>

            <div class="content-actions">
              <button type="button" class="button secondary" @click="addHeading">+ Título</button>

              <button type="button" class="button secondary" @click="addParagraph">
                + Parágrafo
              </button>
            </div>
          </div>

          <div v-for="(block, index) in content" :key="index" class="content-block">
            <div class="block-toolbar">
              <span>
                {{ block.type === 'heading' ? 'Título' : 'Parágrafo' }}
              </span>

              <div class="block-actions">
                <button type="button" title="Mover para cima" @click="moveBlockUp(index)">↑</button>

                <button type="button" title="Mover para baixo" @click="moveBlockDown(index)">
                  ↓
                </button>

                <button type="button" title="Excluir bloco" @click="removeBlock(index)">×</button>
              </div>
            </div>

            <input
              v-if="block.type === 'heading'"
              v-model="block.content"
              type="text"
              class="heading-input"
              placeholder="Digite o título da seção"
            />

            <textarea
              v-else
              v-model="block.content"
              class="content-textarea"
              rows="6"
              placeholder="Escreva o conteúdo do parágrafo..."
            />
          </div>

          <div v-if="content.length > 0" class="add-block">
            <button type="button" class="button secondary" @click="addHeading">+ Título</button>

            <button type="button" class="button secondary" @click="addParagraph">
              + Parágrafo
            </button>
          </div>
        </section>
      </main>

      <!-- Sidebar -->

      <aside class="editor-sidebar">
        <section class="sidebar-card">
          <h2>Publicação</h2>

          <label for="status"> Status </label>

          <select id="status" v-model="status" class="input">
            <option value="draft">Rascunho</option>

            <option value="published">Publicado</option>
          </select>
        </section>

        <section class="sidebar-card">
          <h2>Categoria</h2>

          <label for="category"> Categoria </label>

          <select id="category" v-model="categoryId" class="input" :disabled="loadingCategories">
            <option value="">Selecione uma categoria</option>

            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </section>

        <section class="sidebar-card">
          <h2>Imagem destacada</h2>

          <label for="featured-image"> URL da imagem </label>

          <input
            id="featured-image"
            v-model="featuredImage"
            type="url"
            class="input"
            placeholder="https://..."
          />

          <div v-if="featuredImage" class="image-preview">
            <img :src="featuredImage" alt="Imagem destacada" />
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.post-create-page {
  min-height: 100vh;
  padding: 40px;
  background: var(--color-background);
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 10px 0 5px;
  color: var(--color-text);
}

.page-header p {
  margin: 0;
  color: var(--color-text-muted);
}

.back-button {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.button {
  border: 0;
  border-radius: 8px;
  padding: 12px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button.primary {
  background: var(--color-primary);
  color: white;
}

.button.secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.editor-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 25px;
  max-width: 1400px;
  margin: 0 auto;
}

.editor-main {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.editor-card,
.sidebar-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 25px;
}

.editor-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar-card {
  margin-bottom: 20px;
}

.sidebar-card h2,
.section-header h2 {
  margin: 0 0 15px;
  color: var(--color-text);
}

.section-header p {
  margin: 0;
  color: var(--color-text-muted);
}

label {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.input,
.title-input,
.heading-input,
.textarea,
.content-textarea,
select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
  outline: none;
}

.input,
select {
  padding: 11px 12px;
}

.title-input {
  padding: 15px;
  font-size: 28px;
  font-weight: 600;
}

.heading-input {
  padding: 13px;
  font-size: 21px;
  font-weight: 600;
}

.textarea,
.content-textarea {
  resize: vertical;
  padding: 13px;
  line-height: 1.6;
}

.empty-content {
  padding: 40px;
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  text-align: center;
}

.empty-content p {
  margin-top: 0;
  color: var(--color-text-muted);
}

.content-actions,
.add-block {
  display: flex;
  gap: 10px;
}

.content-block {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
}

.block-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--color-background);
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
}

.block-actions {
  display: flex;
  gap: 4px;
}

.block-actions button {
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 16px;
}

.block-actions button:hover {
  color: var(--color-primary);
}

.content-block .heading-input,
.content-block .content-textarea {
  border: 0;
  border-radius: 0;
}

.image-preview {
  margin-top: 12px;
  overflow: hidden;
  border-radius: 8px;
}

.image-preview img {
  display: block;
  width: 100%;
  height: auto;
}

.message {
  max-width: 1400px;
  margin: 0 auto 20px;
  padding: 14px 18px;
  border-radius: 8px;
}

.message.error {
  background: #fee2e2;
  color: #991b1b;
}

.message.success {
  background: #dcfce7;
  color: #166534;
}

@media (max-width: 900px) {
  .post-create-page {
    padding: 20px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .button {
    flex: 1;
  }

  .editor-layout {
    grid-template-columns: 1fr;
  }
}
</style>
