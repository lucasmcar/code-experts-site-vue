<template>
  <Transition name="menu">
    <div v-if="open" class="mobile-menu">
      <nav>
        <RouterLink to="/" @click="$emit('close')"> Início </RouterLink>

        <RouterLink to="/solucoes" @click="$emit('close')"> Soluções </RouterLink>

        <RouterLink to="/projetos" @click="$emit('close')"> Projetos </RouterLink>

        <RouterLink to="/sobre" @click="$emit('close')"> Sobre </RouterLink>

        <RouterLink to="/contato" @click="$emit('close')"> Contato </RouterLink>
      </nav>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>

<style scoped>
.mobile-menu {
  padding: 20px;

  background: white;
  border-top: 1px solid var(--color-border);
}

.mobile-menu nav {
  display: flex;
  flex-direction: column;
}

.mobile-menu a {
  padding: 15px 0;

  border-bottom: 1px solid var(--color-border);

  font-weight: 500;
}

.mobile-menu a.router-link-active {
  color: var(--color-primary);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
