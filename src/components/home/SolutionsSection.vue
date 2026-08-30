<template>
  <article class="service-card">
    <div class="service-card__icon">
      {{ service.icon }}
    </div>

    <h3>
      {{ service.title }}
    </h3>

    <p>
      {{ service.description }}
    </p>

    <RouterLink :to="`/solucoes#${service.id}`" class="service-card__link">
      Saiba mais →
    </RouterLink>
  </article>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
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
}

.service-card__link {
  display: inline-block;
  margin-top: 25px;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 600;
}
</style>
