Decisões e justificativas (contexto técnico).

Decisão: Instalar Tailwind CSS, React Router DOM e Axios no frontend
Justificativa: Essas bibliotecas são padrão na stack descrita no AGENTS.md e facilitam o desenvolvimento de UI responsiva, roteamento em SPA e comunicação com o back-end.
Alternativas consideradas: Manter apenas React e implementar roteamento, estilos e chamadas HTTP manualmente — rejeitado por aumentar custo e retrabalho.

Decisão: Integração com Back-end Spring Boot local + fallback mock
Justificativa: Permite desenvolvimento integrado com o back-end previsto (Java Spring Boot) e, quando o back-end não estiver disponível, o frontend pode usar mocks para permitir progresso offline e testes rápidos.
Alternativas consideradas: Utilizar apenas mock local — rejeitado pela necessidade de validar regras de negócio (disponibilidade, cálculos) que são implementadas no back-end.

Decisão: Estratégia de concorrência para reservas — otimista com verificação de conflitos no back-end
Justificativa: Preferir controle pelo servidor (transações no BD / bloqueio de linhas ou verificação no serviço) para evitar overbooking; o front-end apenas exibe erros e feedback. Retry otimista + verificação reduz bloqueios longos.
Alternativas consideradas: Lock pessimista no front-end/UI — rejeitado por não ser confiável em ambientes distribuídos.

Decisão: Testes front-end — ESLint + React Testing Library (unitários/integrados)
Justificativa: ESLint já está configurado; React Testing Library é a prática padrão para testes de componentes React modernos. Testes E2E (Cypress/Playwright) podem ser adicionados posteriormente.
Alternativas consideradas: Não ter testes automatizados — rejeitado por questões de qualidade.

Todos os itens que estavam marcados como NEEDS CLARIFICATION no plano foram resolvidos acima.
