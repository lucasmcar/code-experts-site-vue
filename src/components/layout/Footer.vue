<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div>
          <strong>CODE EXPERTS</strong>

          <p>Tecnologia para simplificar processos e transformar negócios.</p>
        </div>

        <div>
          <h3>Navegação</h3>

          <RouterLink to="/"> Início </RouterLink>

          <RouterLink to="/solucoes"> Soluções </RouterLink>

          <RouterLink to="/projetos"> Projetos </RouterLink>

          <RouterLink to="/sobre"> Sobre </RouterLink>

          <RouterLink to="/contato"> Contato </RouterLink>
        </div>
      </div>

      <div class="footer__bottom">
        © {{ new Date().getFullYear() }}
        Code Experts Sistemas LTDA.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 60px 0 20px;

  background: #0f172a;
  color: white;
}

.footer__content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
}

.footer p {
  max-width: 350px;
  margin-top: 12px;

  color: #94a3b8;
}

.footer h3 {
  margin-bottom: 15px;
}

.footer a {
  display: block;
  margin-bottom: 8px;

  color: #94a3b8;
}

.footer__bottom {
  margin-top: 50px;
  padding-top: 20px;

  border-top: 1px solid #334155;

  color: #64748b;
  font-size: 14px;
}

@media (max-width: 700px) {
  .footer__content {
    grid-template-columns: 1fr;
  }
}
</style>
