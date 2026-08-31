<template>
  <header class="header">
    <div class="container header__content">
      <RouterLink to="/" class="header__logo"> CODE EXPERTS </RouterLink>

      <nav class="header__nav">
        <RouterLink to="/"> Início </RouterLink>

        <RouterLink to="/solucoes"> Soluções </RouterLink>

        <RouterLink to="/projetos"> Projetos </RouterLink>

        <RouterLink to="/sobre"> Sobre </RouterLink>

        <RouterLink to="/contato"> Contato </RouterLink>

        <RouterLink to="/blog"> Blog </RouterLink>
      </nav>

      <RouterLink to="/contato" class="header__button"> Fale conosco </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;

  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--color-border);
}

.header__content {
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.header__logo {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header__nav a {
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 500;
}

.header__nav a.router-link-active {
  color: var(--color-primary);
}

.header__button {
  padding: 10px 18px;

  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: white;

  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 850px) {
  .header__nav {
    display: none;
  }
}
</style>
