<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <span class="error-page__code">
        {{ error?.statusCode || 500 }}
      </span>

      <h1>
        {{ error?.statusMessage || 'Ocorreu um erro' }}
      </h1>

      <p>Não foi possível carregar esta página.</p>

      <button type="button" @click="clearError({ redirect: '/' })">Voltar para o início</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.error-page__content {
  max-width: 600px;
  text-align: center;
}

.error-page__code {
  display: block;
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 20px;
}

.error-page__content h1 {
  margin-bottom: 16px;
}

.error-page__content p {
  margin-bottom: 24px;
}

.error-page__content button {
  cursor: pointer;
}
</style>
