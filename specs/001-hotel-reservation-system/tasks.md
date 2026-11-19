# Tarefas: Listagem e Cadastro de Reservas

**Entrada**: Documentos de design em `/specs/001-hotel-reservation-system/`

**Pré-requisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md` e `contracts/`.

**Testes**: Obrigatórios pela atividade. Escrever os testes da história antes da implementação e confirmar que falham pelos motivos esperados.

**Organização**: Uma história P1, independente e demonstrável.

## Formato

- `[P]` indica tarefas que podem ser executadas em paralelo sem conflito de arquivos.
- `[US1]` identifica tarefas da única história de usuário.
- Toda tarefa contém os caminhos exatos dos arquivos.

## Fase 1: Preparação

**Objetivo**: Configurar dados locais, scripts e infraestrutura de testes.

- [x] T001 Adicionar JSON Server, Vitest, jsdom e bibliotecas React Testing Library, além dos scripts `api` e `test`, em `sdd-jp/package.json` e atualizar `sdd-jp/package-lock.json`.
- [x] T002 Configurar Vitest e ambiente jsdom em `sdd-jp/vite.config.js` e criar `sdd-jp/src/setupTests.js`.
- [x] T003 Criar `db.json` na raiz com as coleções `quartos` e `reservas`, dados demonstrativos e referências consistentes conforme `specs/001-hotel-reservation-system/data-model.md`.

## Fase 2: História de Usuário 1 - Consultar e cadastrar reservas (Prioridade: P1)

**Objetivo**: Consultar quartos e solicitações existentes, cadastrar uma solicitação válida e apresentar erros de consulta/gravação.

**Teste independente**: Com JSON Server ativo, a página mostra quartos e solicitações; uma solicitação válida é salva e aparece uma vez. Sem a API, a página informa o erro e permite nova tentativa.

### Testes da História de Usuário 1

Escrever e executar estes testes antes das tarefas de implementação; confirmar falhas por ausência da funcionalidade, não por erro na configuração de testes.

- [ ] T004 [P] [US1] Testar `listarQuartos`, `listarReservas` e `criarReserva`, respostas válidas, HTTP não-2xx, falha de rede e corpo enviado em `sdd-jp/src/api/reservas.test.js`.
- [ ] T005 [P] [US1] Testar carregamento/lista vazia, validação, cadastro único, nova tentativa após falha GET e preservação do formulário após falha POST em `sdd-jp/src/pages/ReservasPage.test.jsx`.

### Implementação da História de Usuário 1

- [ ] T006 [US1] Implementar `listarQuartos`, `listarReservas` e `criarReserva` com `fetch`, validação de resposta HTTP e erros tratáveis em `sdd-jp/src/api/reservas.js`.
- [ ] T007 [P] [US1] Criar formulário acessível para hóspede, quarto, datas e quantidade de pessoas, validando obrigatoriedade, `dataFim > dataInicio` e capacidade em `sdd-jp/src/components/FormularioReserva.jsx`.
- [ ] T008 [P] [US1] Criar a lista de solicitações com nome do hóspede, quarto, período, quantidade e estado vazio em `sdd-jp/src/components/ListaReservas.jsx`.
- [ ] T009 [US1] Implementar carregamento paralelo de quartos/reservas, mensagens de carregamento/erro, ação de repetir consulta, envio do formulário e inclusão única da resposta em `sdd-jp/src/pages/ReservasPage.jsx`.
- [ ] T010 [US1] Substituir a tela padrão do Vite pela página de reservas em `sdd-jp/src/App.jsx`.
- [ ] T011 [US1] Aplicar estilos responsivos e estados visíveis de foco, erro e desabilitado em `sdd-jp/src/App.css` e `sdd-jp/src/index.css` sem adicionar biblioteca de UI.

**Checkpoint**: A história está completa quando os testes automatizados passam e o fluxo funciona contra JSON Server.

## Fase Final: Documentação e validação

**Objetivo**: Preparar a entrega acadêmica e conferir o fluxo completo.

- [ ] T012 Atualizar o `README.md` da raiz com tema, integrantes, SpecKit, comandos de execução, caminhos dos artefatos, divisão de tarefas e reflexão, usando informações confirmadas pelo grupo.
- [ ] T013 Executar `npm test`, `npm run lint`, `npm run build` e todos os cenários manuais de `specs/001-hotel-reservation-system/quickstart.md`; corrigir falhas antes do commit.

## Dependências e ordem de execução

- A Fase 1 (Preparação) deve terminar antes dos testes da história.
- T004 e T005 podem ser escritos em paralelo; ambos devem falhar inicialmente pela ausência da feature.
- T006 deve ser implementada antes de integrar a página; T007 e T008 podem ser desenvolvidas em paralelo após o grupo definir as props dos componentes.
- T009 depende de T006-T008; T010 e T011 integram a página ao app e ao estilo.
- T012-T013 fecham a documentação e a validação antes do commit desta única feature.

## Estratégia de implementação

Entregar somente a História de Usuário 1 como MVP. Não iniciar autenticação, confirmação de disponibilidade, cancelamento, pagamento, avaliação ou back-end próprio.

## Oportunidades de paralelismo

- T004 (testes do serviço) e T005 (testes de página) usam arquivos diferentes.
- T007 (formulário) e T008 (lista) podem ser divididas entre integrantes.
- A integração da página, a documentação e a validação dependem das tarefas anteriores.
