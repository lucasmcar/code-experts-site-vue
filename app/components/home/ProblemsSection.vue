<template>
  <section class="section">
    <div class="container problems">
      <div>
        <SectionTitle
          eyebrow="Seu desafio"
          title="Sua empresa poderia estar funcionando melhor?"
          description="Muitos problemas do dia a dia podem ser resolvidos com processos mais inteligentes e tecnologia adequada."
        />
      </div>

      <div class="problems__list">
        <div class="problem">
          <span>01</span>
          <div>
            <h3>Processos manuais</h3>
            <p>Tarefas repetitivas consumindo tempo da sua equipe.</p>
          </div>
        </div>

        <div class="problem">
          <span>02</span>
          <div>
            <h3>Sistemas desconectados</h3>
            <p>Informações espalhadas em diferentes ferramentas.</p>
          </div>
        </div>

        <div class="problem">
          <span>03</span>
          <div>
            <h3>Problemas tecnológicos</h3>
            <p>Falta de suporte, manutenção ou infraestrutura adequada.</p>
          </div>
        </div>

        <div class="problem">
          <span>04</span>
          <div>
            <h3>Falta de automação</h3>
            <p>Processos que poderiam ser realizados de forma automática.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '../ui/SectionTitle.vue'
</script>

<style scoped>
.problems {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
}

.problems__list {
  display: flex;
  flex-direction: column;
}

.problem {
  display: flex;
  gap: 20px;

  padding: 22px 0;

  border-bottom: 1px solid var(--color-border);
}

.problem > span {
  color: var(--color-primary);

  font-family: monospace;
  font-weight: 700;
}

.problem h3 {
  font-size: 18px;
}

.problem p {
  margin-top: 5px;

  color: var(--color-text-secondary);
  font-size: 14px;
}

@media (max-width: 800px) {
  .problems {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
