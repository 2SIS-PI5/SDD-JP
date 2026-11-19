# SDD-JP

## Projeto e integrantes

Aplicação React + Vite que consome uma API mock (JSON Server) para a **experiência do cliente do Hotel Sereno**: catálogo de acomodações, consulta de disponibilidade por datas, solicitação de reserva em etapas, pagamento simulado e área do cliente.

É uma demonstração acadêmica. Autenticação, pagamento e disponibilidade são simulações: não há cobrança real, não há envio de e-mail e a disponibilidade é calculada no cliente a partir do `db.json`. Não há painel administrativo nem gestão de funcionários.

Integrantes: **[PREENCHER pelo grupo: nomes completos]**

## Framework utilizado

**SpecKit** (GitHub Spec Kit), com a integração para OpenCode. O fluxo seguido foi: constituição, especificação, plano, tarefas e implementação, nessa ordem.

## Como rodar

Requer Node.js 20.19 ou superior. Em dois terminais, a partir da pasta `sdd-jp/`:

```bash
npm install
npm run api   # JSON Server em http://localhost:3000 (usa ../db.json)
npm run dev   # aplicação em http://localhost:5173
```

Outros comandos: `npm test`, `npm run lint`, `npm run build`. A URL da API pode ser alterada com a variável `VITE_API_URL` (veja `.env.example`).

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial com busca e destaques |
| `/acomodacoes` | Catálogo completo com filtros e ordenação |
| `/acomodacoes/:id` | Detalhe da acomodação, galeria e painel de reserva |
| `/buscar` | Resultados disponíveis para as datas informadas |
| `/reservar/:id` | Fluxo de reserva protegido (hospedagem, hóspede, revisão, pagamento, confirmação) |
| `/login`, `/cadastro` | Autenticação simulada |
| `/recuperar-senha`, `/redefinir-senha` | Recuperação de senha simulada |
| `/minha-conta` | Visão geral, reservas, detalhe/cancelamento e perfil (protegidas) |
| `/avaliacoes`, `/sobre`, `/contato` | Páginas institucionais |

## Onde estão os artefatos

- Constituição: `.specify/memory/constitution.md`
- Feature original: `specs/001-hotel-reservation-system/` (`spec.md`, `plan.md`, `tasks.md`, `contracts/api.md`, `data-model.md`, `quickstart.md`)
- Feature do cliente (MVP): `specs/002-frontend-cliente-mvp/` (`spec.md`, `plan.md`, `tasks.md`)
- Contrato de dados da API: `db.json`
- Código:
  - `sdd-jp/src/services` — acesso à API e regras de disponibilidade, reserva, pagamento e autenticação
  - `sdd-jp/src/components` — átomos, moléculas e organismos com CSS Modules
  - `sdd-jp/src/pages`, `sdd-jp/src/layouts`, `sdd-jp/src/routes` — páginas, layouts e rotas
  - `sdd-jp/src/styles` — tokens de design e estilos globais
- Testes: `sdd-jp/src/api/reservas.test.js`, `sdd-jp/src/pages/ReservasPage.test.jsx`, `sdd-jp/src/services/availabilityService.test.js` e `sdd-jp/src/utils/reserva.test.js`

## Limitações da demonstração

- A autenticação grava as senhas no JSON Server como hash SHA-256 com salt; ainda assim, é uma simulação local e não deve ser usada com senhas reais.
- O pagamento é apenas ilustrativo (PIX fictício ou cartão fictício). Nenhum dado de cartão é persistido e nenhuma transação financeira acontece.
- A disponibilidade considera as reservas não canceladas do mock, sem controle de concorrência.
- A recuperação de senha não envia e-mail; a redefinição é feita localmente na demonstração.

## Contribuições

- Omar - Responsável por criar toda a estrutura inicial do projeto e criação do repositório da atividade
Patricia - Responsável de fazer a Spec do projeto com a ideação do grupo e configuração do AGENTS.md  
Nicolly - Responsábel por realizar o plan do projeto de acordo com o que foi feito na Spec.
Ryan - Responsável por realizar a separação das tasks de implementação do que foi idealizado na Spec e planejado no Plan.
Miguel -  Responsável por fazer a implementação das Tasks do projeto e testar para ver se estava tudo de acordo.

## Reflexão

O SDD ajudou a ter toda a implementação que idealizamos documentada, onde ajuda o agente a ter uma noção do que queríamos e seguir aquilo que tínhamos documentado. O que atrapalhou foi não ter especificado mais o projeto no primeiro plano, porque deixamos bem básico e no segundo plano percebemos que faltavam detalhes importantes, como os estados de carregamento, erro e vazio das telas, as regras de validação dos formulários e o comportamento esperado quando a API falha. Esses pontos só apareceram durante a implementação, o que gerou retrabalho e várias idas e voltas para ajustar o que já estava pronto.

Mesmo com esses problemas, a maior lição foi perceber que investir tempo na Spec e no Plan economiza tempo depois: quanto mais claro o contrato de dados, o fluxo de telas e os critérios de aceite, menos correções são necessárias na reta final, e o grupo consegue dividir melhor as tarefas e acompanhar o que está sendo feito. Se fossemos refazer o projeto, começaríamos detalhando melhor os fluxos principais antes de implementar, definiríamos desde o início os padrões de componentes, as mensagens de erro e o formato dos dados do mock, e validaríamos cada entrega com testes e checklist antes de avançar para a próxima tarefa, em entregas menores revisadas em grupo.
