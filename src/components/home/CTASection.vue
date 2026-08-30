<template>
  <section class="section cta">
    <div class="container">
      <div class="cta__content">
        <span> VAMOS CONVERSAR? </span>

        <h2>Tem um processo que poderia ser melhor?</h2>

        <p>Conte para nós o que sua empresa precisa. Podemos encontrar uma solução.</p>

        <Button to="/contato" variant="outline" size="large" arrow>
          Fale com a Code Experts
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '../ui/Button.vue'
</script>

<style scoped>
.cta {
  background: var(--color-primary);
  color: white;
}

.cta__content {
  max-width: 750px;
}

.cta span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.cta h2 {
  margin-top: 15px;

  font-size: clamp(35px, 5vw, 55px);
  line-height: 1.1;
  letter-spacing: -2px;
}

.cta p {
  margin: 20px 0 30px;

  color: rgba(255, 255, 255, 0.8);

  font-size: 17px;
}

.cta :deep(.button--outline) {
  border-color: white;
  color: white;
}

.cta :deep(.button--outline:hover) {
  background: white;
  color: var(--color-primary);
}
</style>
