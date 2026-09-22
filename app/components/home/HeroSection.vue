<template>
  <section class="hero">
    <div class="container hero__content">
      <div class="hero__text">
        <span class="hero__eyebrow"> Tecnologia para empresas </span>

        <h1>
          Tecnologia que
          <span>transforma</span>
          processos em resultados.
        </h1>

        <p>
          Desenvolvemos sistemas, aplicativos e soluções tecnológicas para ajudar empresas a
          trabalhar de forma mais simples, eficiente e inteligente.
        </p>

        <div class="hero__actions">
          <Button to="/solucoes" size="large" arrow> Conheça nossas soluções </Button>

          <Button to="/contato" variant="outline" size="large"> Fale conosco </Button>
        </div>
      </div>

      <div class="hero__visual">
        <div class="code-window">
          <div class="code-window__header">
            <span />
            <span />
            <span />
          </div>

          <div class="code-window__body">
            <div>
              <span class="code-number">01</span>
              <span>const</span>
              <strong> solution </strong>
              =
              <span>CodeExperts</span>
            </div>

            <div>
              <span class="code-number">02</span>
              solution.<span>automate</span>()
            </div>

            <div>
              <span class="code-number">03</span>
              solution.<span>optimize</span>()
            </div>

            <div>
              <span class="code-number">04</span>
              solution.<span>grow</span>()
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '../ui/Button.vue'
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 76px);

  display: flex;
  align-items: center;

  background: radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.12), transparent 35%);
}

.hero__content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 80px;

  padding: 100px 0;
}

.hero__eyebrow {
  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.hero h1 {
  max-width: 700px;
  margin-top: 18px;

  font-size: clamp(42px, 5vw, 68px);
  line-height: 1.05;
  letter-spacing: -3px;
}

.hero h1 span {
  color: var(--color-primary);
}

.hero__text > p {
  max-width: 600px;
  margin-top: 28px;

  color: var(--color-text-secondary);

  font-size: 18px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  margin-top: 35px;
}

.hero__visual {
  display: flex;
  justify-content: center;
}

.code-window {
  width: 100%;
  max-width: 500px;

  overflow: hidden;

  border: 1px solid #1e293b;
  border-radius: 16px;

  background: #0f172a;

  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.25);
}

.code-window__header {
  height: 45px;

  display: flex;
  align-items: center;
  gap: 7px;

  padding: 0 16px;

  border-bottom: 1px solid #1e293b;
}

.code-window__header span {
  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #475569;
}

.code-window__body {
  padding: 30px;

  color: #cbd5e1;

  font-family: monospace;
  font-size: 15px;
  line-height: 2;
}

.code-window__body div {
  white-space: nowrap;
}

.code-number {
  display: inline-block;
  width: 35px;

  color: #475569;
}

.code-window strong {
  color: #e2e8f0;
}

@media (max-width: 900px) {
  .hero__content {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .hero__visual {
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .hero__content {
    padding: 70px 0;
  }

  .hero h1 {
    letter-spacing: -2px;
  }

  .code-window__body {
    padding: 20px;

    font-size: 12px;
  }
}
</style>
