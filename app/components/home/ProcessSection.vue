<template>
  <section class="section process">
    <div class="container">
      <SectionTitle
        eyebrow="Como trabalhamos"
        title="Do problema à solução."
        description="Um processo simples e transparente para transformar uma necessidade em uma solução tecnológica."
        center
      />

      <div class="process__grid">
        <div class="process__item">
          <span>01</span>
          <h3>Diagnóstico</h3>
          <p>Entendemos o problema e as necessidades da sua empresa.</p>
        </div>

        <div class="process__item">
          <span>02</span>
          <h3>Planejamento</h3>
          <p>Definimos a melhor estratégia e a solução adequada.</p>
        </div>

        <div class="process__item">
          <span>03</span>
          <h3>Desenvolvimento</h3>
          <p>Transformamos o planejamento em uma solução funcional.</p>
        </div>

        <div class="process__item">
          <span>04</span>
          <h3>Suporte</h3>
          <p>Continuamos próximos para manter a solução funcionando.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '../ui/SectionTitle.vue'
</script>

<style scoped>
.process {
  background: #0f172a;
  color: white;
}

.process :deep(.section-title p) {
  color: #94a3b8;
}

.process__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.process__item {
  padding: 30px;

  border-left: 1px solid #334155;
}

.process__item span {
  color: #60a5fa;

  font-family: monospace;
  font-size: 14px;
}

.process__item h3 {
  margin-top: 35px;
  font-size: 21px;
}

.process__item p {
  margin-top: 12px;

  color: #94a3b8;
  font-size: 14px;
}

@media (max-width: 800px) {
  .process__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .process__grid {
    grid-template-columns: 1fr;
  }

  .process__item {
    border-left: 0;
    border-bottom: 1px solid #334155;
  }
}
</style>
