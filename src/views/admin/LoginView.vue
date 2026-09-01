<template>
  <main class="login-page">
    <div class="login-card">
      <div class="login-brand">
        <RouterLink to="/"> Code Experts </RouterLink>
      </div>

      <div class="login-header">
        <span class="eyebrow"> Área administrativa </span>

        <h1>Acesse sua conta</h1>

        <p>Entre para gerenciar os conteúdos do blog.</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email"> E-mail </label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password"> Senha </label>

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <RouterLink to="/" class="back-link"> ← Voltar para o site </RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/services/supabase'

const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMessage.value = 'E-mail ou senha inválidos.'
    return
  }

  router.push('/admin')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;

  background: radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.12), transparent 40%);

  background-color: var(--color-background);
}

.login-card {
  width: 100%;
  max-width: 440px;

  padding: 45px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);

  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.08);
}

.login-brand {
  margin-bottom: 45px;

  text-align: center;
}

.login-brand a {
  color: var(--color-text);

  font-size: 20px;
  font-weight: 800;

  text-decoration: none;
}

.eyebrow {
  display: inline-block;

  color: var(--color-primary);

  font-size: 12px;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.login-header h1 {
  margin-top: 12px;

  font-size: 34px;
  line-height: 1.1;

  letter-spacing: -1px;
}

.login-header p {
  margin-top: 12px;

  color: var(--color-text-secondary);

  font-size: 14px;
  line-height: 1.6;
}

.login-form {
  margin-top: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;

  gap: 8px;

  margin-bottom: 20px;
}

.form-group label {
  font-size: 13px;
  font-weight: 700;
}

.form-group input {
  width: 100%;

  padding: 13px 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: var(--color-background);

  color: var(--color-text);

  font-size: 14px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus {
  border-color: var(--color-primary);

  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.error-message {
  margin-bottom: 18px;

  padding: 11px 13px;

  border-radius: var(--radius-md);

  background: rgba(220, 38, 38, 0.08);

  color: #dc2626;

  font-size: 13px;
}

.login-button {
  width: 100%;

  padding: 14px 20px;

  border: 0;
  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: white;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.back-link {
  display: block;

  margin-top: 28px;

  color: var(--color-text-secondary);

  font-size: 13px;

  text-align: center;
}

@media (max-width: 500px) {
  .login-page {
    padding: 20px;
  }

  .login-card {
    padding: 30px 25px;
  }
}
</style>
