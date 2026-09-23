<template>
  <section class="solutions-section">
    <div class="container">
      <div class="solutions-section__header">
        <span class="eyebrow">Soluções</span>

        <h2>
          Tecnologia para
          <span>fazer sua empresa avançar.</span>
        </h2>

        <p>
          Desenvolvemos soluções tecnológicas para simplificar processos, melhorar resultados e
          apoiar o crescimento da sua empresa.
        </p>
      </div>

      <div class="solutions-section__grid">
        <article v-for="service in services" :key="service.id" class="service-card">
          <div class="service-card__icon">
            {{ service.icon }}
          </div>

          <h3>
            {{ service.title }}
          </h3>

          <p>
            {{ service.description }}
          </p>

          <NuxtLink :to="`/solucoes#${service.id}`" class="service-card__link">
            Saiba mais →
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from '~/data/services'
</script>

<style scoped>
.solutions-section {
  padding: 100px 0;
}

.solutions-section__header {
  max-width: 700px;
  margin-bottom: 50px;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 15px;

  color: var(--color-primary);

  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.solutions-section__header h2 {
  font-size: 42px;
  line-height: 1.15;
}

.solutions-section__header h2 span {
  color: var(--color-primary);
}

.solutions-section__header p {
  margin-top: 20px;

  color: var(--color-text-secondary);

  font-size: 17px;
  line-height: 1.7;
}

.solutions-section__grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 25px;
}

.service-card {
  padding: 30px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: white;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.service-card:hover {
  transform: translateY(-5px);

  border-color: rgba(37, 99, 235, 0.3);

  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
}

.service-card__icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 25px;

  border-radius: 12px;

  background: rgba(37, 99, 235, 0.1);

  color: var(--color-primary);

  font-size: 22px;
}

.service-card h3 {
  font-size: 20px;
}

.service-card p {
  margin-top: 12px;

  color: var(--color-text-secondary);

  font-size: 15px;
  line-height: 1.6;
}

.service-card__link {
  display: inline-block;

  margin-top: 25px;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .solutions-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .solutions-section {
    padding: 70px 0;
  }

  .solutions-section__header h2 {
    font-size: 32px;
  }

  .solutions-section__grid {
    grid-template-columns: 1fr;
  }
}
</style>
