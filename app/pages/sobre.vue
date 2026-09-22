<template>
  <main class="about-page">
    <!-- HERO -->
    <section class="about-hero">
      <div class="container about-hero__content">
        <span class="eyebrow"> Sobre a Code Experts </span>

        <h1>
          Tecnologia para
          <span>simplificar negócios.</span>
        </h1>

        <p>Conheça nossa forma de pensar, trabalhar e construir soluções para empresas.</p>
      </div>
    </section>

    <!-- PROPÓSITO -->
    <section class="section purpose-section">
      <div class="container purpose-grid">
        <div class="section-heading">
          <span class="eyebrow"> Nosso propósito </span>

          <h2>Aproximar a tecnologia das empresas.</h2>
        </div>

        <div class="purpose-content">
          <p>
            A Code Experts Sistemas nasceu com um propósito claro: tornar a tecnologia mais
            acessível e útil para empresas que precisam melhorar seus processos, mas nem sempre
            encontram soluções adequadas às suas necessidades.
          </p>

          <p>
            Acreditamos que tecnologia não deve ser complexa por si só. Ela deve resolver problemas,
            economizar tempo, organizar informações e ajudar empresas a trabalharem melhor.
          </p>

          <p>
            Por isso, desenvolvemos soluções pensando na realidade de cada negócio, buscando
            equilíbrio entre <strong>qualidade, simplicidade, inovação e custo.</strong>
          </p>
        </div>
      </div>
    </section>

    <!-- MISSÃO E VISÃO -->
    <section class="section mission-section">
      <div class="container">
        <div class="section-heading section-heading--center">
          <span class="eyebrow"> Onde queremos chegar </span>

          <h2>Uma tecnologia mais próxima dos negócios.</h2>
        </div>

        <div class="mission-grid">
          <article class="mission-card">
            <div class="mission-card__number">01</div>

            <span class="card-label"> Nossa missão </span>

            <h3>Transformar desafios em soluções.</h3>

            <p>
              Oferecer soluções tecnológicas que ajudem micro e pequenas empresas a simplificar
              processos, melhorar sua operação e aproveitar melhor seus recursos, sempre com
              qualidade, transparência e preço justo.
            </p>
          </article>

          <article class="mission-card">
            <div class="mission-card__number">02</div>

            <span class="card-label"> Nossa visão </span>

            <h3>Ser referência em tecnologia.</h3>

            <p>
              Ser referência em tecnologia para micro e pequenas empresas, oferecendo um conjunto
              completo de soluções e sendo reconhecida pela qualidade, preço justo e inovação.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- VALORES -->
    <section class="section values-section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow"> Nossos valores </span>

          <h2>Princípios que orientam nosso trabalho.</h2>

          <p>Mais do que aquilo que fazemos, importa a forma como fazemos.</p>
        </div>

        <div class="values-grid">
          <article class="value-card">
            <div class="value-icon">01</div>

            <h3>Honestidade</h3>

            <p>Construímos relações baseadas em confiança, transparência e respeito.</p>
          </article>

          <article class="value-card">
            <div class="value-icon">02</div>

            <h3>Transparência</h3>

            <p>
              Explicamos nossas soluções de forma clara e mantemos o cliente informado durante todo
              o processo.
            </p>
          </article>

          <article class="value-card">
            <div class="value-icon">03</div>

            <h3>Preço justo</h3>

            <p>
              Buscamos oferecer soluções compatíveis com a realidade de cada empresa, sem
              comprometer a qualidade.
            </p>
          </article>

          <article class="value-card">
            <div class="value-icon">04</div>

            <h3>Qualidade</h3>

            <p>
              Desenvolvemos soluções confiáveis, bem estruturadas e alinhadas aos objetivos de cada
              projeto.
            </p>
          </article>

          <article class="value-card">
            <div class="value-icon">05</div>

            <h3>Proximidade</h3>

            <p>
              Queremos estar próximos dos nossos clientes, entendendo seus problemas e acompanhando
              suas necessidades.
            </p>
          </article>

          <article class="value-card">
            <div class="value-icon">06</div>

            <h3>Inovação</h3>

            <p>
              Utilizamos a tecnologia para encontrar maneiras melhores, mais eficientes e
              inteligentes de resolver problemas.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- TECNOLOGIA COM PROPÓSITO -->
    <section class="section technology-section">
      <div class="container">
        <div class="technology-box">
          <div class="technology-content">
            <span class="eyebrow"> Tecnologia com propósito </span>

            <h2>Tecnologia não é apenas código.</h2>

            <p>
              É entender um processo, identificar uma oportunidade de melhoria e encontrar uma
              maneira mais eficiente de fazer as coisas.
            </p>

            <p>
              Pode ser um sistema desenvolvido sob medida, uma automação, um aplicativo, uma
              melhoria na infraestrutura ou simplesmente uma orientação sobre qual tecnologia faz
              sentido para determinado negócio.
            </p>
          </div>

          <div class="technology-quote">
            <span> Nossa filosofia </span>

            <blockquote>“A melhor tecnologia é aquela que resolve o problema certo.”</blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section about-cta">
      <div class="container about-cta__content">
        <span class="eyebrow"> Vamos conversar? </span>

        <h2>
          Sua empresa tem um desafio.
          <span>Vamos encontrar a solução.</span>
        </h2>

        <p>
          Conte para a Code Experts Sistemas o que sua empresa precisa e descubra como a tecnologia
          pode ajudar.
        </p>

        <RouterLink to="/contato" class="cta-button">
          Fale conosco
          <span>→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup></script>

<style scoped>
.about-page {
  background: var(--color-background);
}

/* ========================================
   HERO
======================================== */

.about-hero {
  padding: 110px 0 90px;

  background: radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.12), transparent 35%);
}

.about-hero__content {
  max-width: 900px;
}

.eyebrow {
  display: inline-block;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.about-hero h1 {
  max-width: 850px;

  margin-top: 18px;

  font-size: clamp(44px, 6vw, 70px);
  line-height: 1.05;
  letter-spacing: -3px;
}

.about-hero h1 span {
  display: block;

  color: var(--color-primary);
}

.about-hero p {
  max-width: 650px;

  margin-top: 25px;

  color: var(--color-text-secondary);

  font-size: 18px;
  line-height: 1.7;
}

/* ========================================
   PROPÓSITO
======================================== */

.purpose-section {
  background: var(--color-background-secondary);
}

.purpose-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;

  gap: 100px;

  align-items: start;
}

.section-heading h2 {
  margin-top: 15px;

  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.section-heading p {
  margin-top: 20px;

  color: var(--color-text-secondary);

  font-size: 16px;
  line-height: 1.7;
}

.purpose-content {
  display: flex;
  flex-direction: column;

  gap: 22px;
}

.purpose-content p {
  color: var(--color-text-secondary);

  font-size: 17px;
  line-height: 1.8;
}

.purpose-content strong {
  color: var(--color-text);
}

/* ========================================
   MISSÃO / VISÃO
======================================== */

.mission-section {
  background: var(--color-background);
}

.section-heading--center {
  max-width: 700px;

  margin: 0 auto 55px;

  text-align: center;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 25px;
}

.mission-card {
  position: relative;

  padding: 45px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.mission-card:hover {
  transform: translateY(-5px);

  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.07);
}

.mission-card__number {
  margin-bottom: 30px;

  color: var(--color-primary);

  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
}

.card-label {
  display: block;

  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mission-card h3 {
  margin-top: 12px;

  font-size: 25px;
  line-height: 1.2;
}

.mission-card p {
  margin-top: 18px;

  color: var(--color-text-secondary);

  font-size: 15px;
  line-height: 1.7;
}

/* ========================================
   VALORES
======================================== */

.values-section {
  background: var(--color-background-secondary);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 20px;

  margin-top: 55px;
}

.value-card {
  padding: 30px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.value-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.06);
}

.value-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 25px;

  border-radius: 10px;

  background: rgba(37, 99, 235, 0.1);

  color: var(--color-primary);

  font-size: 12px;
  font-weight: 800;
}

.value-card h3 {
  font-size: 19px;
}

.value-card p {
  margin-top: 10px;

  color: var(--color-text-secondary);

  font-size: 14px;
  line-height: 1.7;
}

/* ========================================
   TECNOLOGIA
======================================== */

.technology-section {
  background: var(--color-background);
}

.technology-box {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;

  gap: 80px;

  padding: 65px;

  border-radius: var(--radius-lg);

  background: var(--color-background-secondary);
}

.technology-content h2 {
  max-width: 600px;

  margin-top: 15px;

  font-size: clamp(30px, 4vw, 45px);
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.technology-content p {
  max-width: 650px;

  margin-top: 20px;

  color: var(--color-text-secondary);

  font-size: 16px;
  line-height: 1.8;
}

.technology-quote {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 45px;

  border-left: 1px solid var(--color-border);
}

.technology-quote span {
  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.technology-quote blockquote {
  margin-top: 15px;

  color: var(--color-primary);

  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -1px;
}

/* ========================================
   CTA
======================================== */

.about-cta {
  background: var(--color-background-secondary);
}

.about-cta__content {
  max-width: 850px;

  text-align: center;
}

.about-cta h2 {
  margin-top: 15px;

  font-size: clamp(34px, 5vw, 55px);
  line-height: 1.1;
  letter-spacing: -2px;
}

.about-cta h2 span {
  display: block;

  color: var(--color-primary);
}

.about-cta p {
  max-width: 600px;

  margin: 22px auto 0;

  color: var(--color-text-secondary);

  font-size: 17px;
  line-height: 1.7;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;

  margin-top: 35px;
  padding: 14px 22px;

  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: white;

  font-size: 15px;
  font-weight: 700;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.cta-button:hover {
  background: var(--color-primary-dark);

  transform: translateY(-2px);
}

.cta-button span {
  font-size: 18px;
}

/* ========================================
   RESPONSIVIDADE
======================================== */

@media (max-width: 900px) {
  .purpose-grid {
    grid-template-columns: 1fr;

    gap: 45px;
  }

  .mission-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .technology-box {
    grid-template-columns: 1fr;

    gap: 45px;

    padding: 45px;
  }

  .technology-quote {
    padding-top: 35px;
    padding-left: 0;

    border-top: 1px solid var(--color-border);
    border-left: 0;
  }
}

@media (max-width: 600px) {
  .about-hero {
    padding: 75px 0 65px;
  }

  .about-hero h1 {
    letter-spacing: -2px;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .mission-card {
    padding: 30px;
  }

  .technology-box {
    padding: 30px 25px;
  }

  .about-cta h2 {
    letter-spacing: -1.5px;
  }
}
</style>
