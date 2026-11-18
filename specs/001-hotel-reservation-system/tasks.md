# Tasks: Sistema de Reservas Hotel Servilha

## Feature: Sistema de Reservas Hotel Servilha

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar estrutura do frontend, dependências e configuração básica

- [ ] T001 Criar pastas do frontend em sdd-jp/src: components/, pages/, context/, services/, assets/ (sdd-jp/src/)
- [ ] T002 Atualizar sdd-jp/package.json adicionando dependências: react-router-dom, axios, tailwindcss, react-hook-form (sdd-jp/package.json)
- [ ] T003 Configurar Tailwind: criar sdd-jp/tailwind.config.cjs e atualizar sdd-jp/src/index.css para incluir diretivas Tailwind (sdd-jp/tailwind.config.cjs, sdd-jp/src/index.css)
- [ ] T004 Criar arquivo de configuração do Axios e base API em sdd-jp/src/services/api.js com baseURL=http://localhost:8080/api e interceptors para Authorization (sdd-jp/src/services/api.js)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura que bloqueia todas as histórias de usuário até estar pronta

 - [ ] T005 [P] Criar AuthContext para gerenciamento de token e estado do usuário em sdd-jp/src/context/AuthContext.jsx
 - [ ] T006 [P] Criar BookingContext para estado de reservas temporárias e seleção de datas em sdd-jp/src/context/BookingContext.jsx
 - [ ] T007 Inicializar roteamento e layout base em sdd-jp/src/App.jsx (React Router DOM, rotas públicas/privadas)
 - [ ] T008 [P] Criar componentes base Navbar e Footer em sdd-jp/src/components/Navbar.jsx e sdd-jp/src/components/Footer.jsx
 - [ ] T009 [P] Criar definições de tipos/models de frontend (JS objects) em sdd-jp/src/types/user.js, sdd-jp/src/types/room.js, sdd-jp/src/types/reservation.js, sdd-jp/src/types/payment.js, sdd-jp/src/types/review.js — incluir e implementar as seguintes validações exatamente como no data-model.md: "email único, formato válido"; "cpf único, validação de formato"; "senha armazenada como hash BCrypt (implementado no back-end)"; "dataFim > dataInicio"; "convidados <= capacidade do quarto"; "Não persistir dados reais de cartão; armazenar apenas dados demonstrativos mascarados se necessário"; "Uma avaliação por reserva por usuário (constraint única em reservaId+usuarioId)".
 - [ ] T010 [P] Implementar fallback mock API para desenvolvimento offline em sdd-jp/src/services/mockApi.js (ativa quando backend indisponível)

---

## Phase 3: User Story 1 - Explorar Informações do Hotel (Priority: P1) 🎯 MVP

**Goal**: Página inicial pública com banner, apresentação, galeria, catálogo de quartos e links para buscar quartos ou acessar login/cadastro

**Independent Test**: Carregar / (Home) exibe banner, seções de apresentação, galeria e pelo menos um RoomCard; botão de busca leva para /rooms

- [ ] T011 [US1] Criar página Home em sdd-jp/src/pages/Home.jsx com seções: Banner, Apresentação, Galeria, Reviews destacadas e botão para /rooms (sdd-jp/src/pages/Home.jsx)
 - [ ] T012 [P] [US1] Criar componente RoomCard em sdd-jp/src/components/RoomCard.jsx que recebe props (id, nome, fotos, precoPorNoite, comodidades, capacidadeAdultos, capacidadeCriancas) e exibe foto, nome, capacidade e preço (sdd-jp/src/components/RoomCard.jsx)
 - [ ] T013 [P] [US1] Implementar função GET /rooms em sdd-jp/src/services/rooms.js: export async function fetchRooms(params) { ... } que usa services/api.js. Query params conforme contrato: dataInicio, dataFim, adults, children, category, minPrice, maxPrice (sdd-jp/src/services/rooms.js)
- [ ] T014 [US1] Registrar rota da Home em sdd-jp/src/App.jsx e ligar Home.jsx ao layout (sdd-jp/src/App.jsx)
- [ ] T015 [US1] Estilizar Home e RoomCard usando classes Tailwind em sdd-jp/src/index.css e sdd-jp/src/pages/Home.jsx (sdd-jp/src/index.css, sdd-jp/src/pages/Home.jsx)

---

## Phase 4: User Story 2 - Consultar Quartos e Disponibilidade (Priority: P2)

**Goal**: Página de listagem de quartos com filtros (datas, hóspedes, categoria, preço) e consulta de disponibilidade ao backend

**Independent Test**: Em /rooms, inserir critérios de pesquisa chama GET /rooms com query params e exibe lista filtrada de RoomCard

 - [ ] T016 [P] [US2] Criar página Rooms em sdd-jp/src/pages/Rooms.jsx com formulário de filtros (dataInicio,dataFim,adults,children,category,minPrice,maxPrice) e área de resultados (sdd-jp/src/pages/Rooms.jsx)
 - [ ] T017 [P] [US2] Implementar função searchRooms(params) em sdd-jp/src/services/rooms.js que monta query string conforme contrato (dataInicio,dataFim,adults,children,category,minPrice,maxPrice) e retorna lista de quartos (sdd-jp/src/services/rooms.js)
- [ ] T018 [US2] Criar página RoomDetails em sdd-jp/src/pages/RoomDetails.jsx que consome GET /rooms/{id} e exibe fotos, comodidades, capacidade e botão reservar (sdd-jp/src/pages/RoomDetails.jsx)
 - [ ] T019 [P] [US2] Implementar componente DateRangePicker em sdd-jp/src/components/DateRangePicker.jsx usado em Rooms.jsx e Booking flow (sdd-jp/src/components/DateRangePicker.jsx)

 - [ ] T036 [P] [US2] Teste de contrato: criar teste em tests/contract/test_rooms_contract.js que valida GET /rooms responde 200 com campos { id, nome, categoria, capacidadeAdultos, capacidadeCriancas, precoPorNoite, fotos, comodidades } quando backend disponível

---

## Phase 5: User Story 3 - Cadastro de Clientes e Login Seguro (Priority: P2)

**Goal**: Formulários de registro e login com validações (CPF, email único, senha forte) e persistência do JWT

**Independent Test**: Um novo usuário consegue se cadastrar (POST /auth/register) e efetuar login (POST /auth/login) recebendo token armazenado em localStorage; rota privada /profile exige token

- [ ] T020 [US3] Criar página Register em sdd-jp/src/pages/Register.jsx com validação de CPF, email e senha e chamada POST /auth/register em sdd-jp/src/services/auth.js (sdd-jp/src/pages/Register.jsx)
- [ ] T021 [US3] Criar página Login em sdd-jp/src/pages/Login.jsx com chamada POST /auth/login e armazenamento do token em localStorage via AuthContext (sdd-jp/src/pages/Login.jsx)
 - [ ] T022 [US3] Implementar auth service em sdd-jp/src/services/auth.js com funções register, login, getCurrentUser e refresh token handling (sdd-jp/src/services/auth.js)

 - [ ] T037 [P] [US3] Teste de contrato: criar teste em tests/contract/test_auth_contract.js que valida POST /auth/register aceita { nome, cpf, email, telefone?, dataNascimento?, senha, acceptTerms } e POST /auth/login retorna { token, expiresIn }

---

## Phase 6: User Story 4 - Fluxo Completo de Reserva (Priority: P2)

**Goal**: Cliente autenticado seleciona datas, hóspedes, escolhe quarto, revisa resumo financeiro e confirma reserva recebendo código de confirmação

**Independent Test**: Usuário autenticado finaliza reserva e recebe resposta 201 com { id, code, status: PENDING, totalAmount }

- [ ] T023 [US4] Criar página Booking em sdd-jp/src/pages/Booking.jsx que exibe resumo da reserva, cálculo simples (noites * diaria) e botão confirmar para criar reserva (sdd-jp/src/pages/Booking.jsx)
 - [ ] T024 [US4] Implementar POST /reservations em sdd-jp/src/services/reservations.js que chama /reservations com quartoId,dataInicio,dataFim,adults,children. Implementar verificação de erros 409 (conflito) e 400 (validação). Rever e aplicar as seguintes regras do data-model.md: "dataFim > dataInicio"; "convidados <= capacidade do quarto"; "conflitos evitados no back-end (verificação transacional); reservas canceladas liberam disponibilidade"; "diaria: snapshot do precoPorNoite do quarto"; "valorTotal: calculado no back-end" (sdd-jp/src/services/reservations.js)

 - [ ] T038 [P] [US4] Teste de contrato: criar teste em tests/contract/test_reservations_contract.js que valida POST /reservations retorna 201 com { id, codigo, status: PENDING, valorTotal, diaria, dataInicio, dataFim } e que POST conflituoso retorna 409
- [ ] T025 [US4] Criar página BookingConfirmation em sdd-jp/src/pages/BookingConfirmation.jsx que mostra código e detalhes retornados pelo backend (sdd-jp/src/pages/BookingConfirmation.jsx)

---

## Phase 7: User Story 5 - Área Pessoal e Gestão de Reservas (Priority: P3)

**Goal**: Perfil do usuário editável e listagem de reservas com possibilidade de cancelamento conforme regras

**Independent Test**: Em /profile usuário vê seus dados e em /my-bookings vê reservas; cancelar reserva muda status para CANCELLED via POST /reservations/{id}/cancel

- [ ] T026 [US5] Criar página Profile em sdd-jp/src/pages/Profile.jsx para visualizar/editar nome e telefone e alterar senha via PUT /auth/me (sdd-jp/src/pages/Profile.jsx)
- [ ] T027 [US5] Criar página MyBookings em sdd-jp/src/pages/MyBookings.jsx que lista reservas do usuário via GET /reservations e mostra ações possíveis (sdd-jp/src/pages/MyBookings.jsx)
 - [ ] T028 [US5] Implementar ação de cancelamento em sdd-jp/src/services/reservations.js com função cancelReservation(reservationId) que chama POST /reservations/{id}/cancel (sdd-jp/src/services/reservations.js)

---

## Phase 8: User Story 6 - Processamento de Pagamento Simulado (Priority: P3)

**Goal**: Processo de pagamento simulado registrando tentativas e atualizando status da reserva

**Independent Test**: Em /payment enviar método e receber 201 { id, status: PENDING } e reserva atualiza para CONFIRMED/FAILED conforme simulação

- [ ] T029 [US6] Criar página Payment em sdd-jp/src/pages/Payment.jsx para enviar método de pagamento e mostrar comprovante demonstrativo (sdd-jp/src/pages/Payment.jsx)
 - [ ] T030 [US6] Implementar serviço de pagamentos em sdd-jp/src/services/payments.js com funções createPayment(reservationId, method, payload) e getPayment(id) (sdd-jp/src/services/payments.js)

 - [ ] T039 [P] [US6] Teste de contrato: criar teste em tests/contract/test_payments_contract.js que valida POST /payments aceita { reservaId, metodo, payload? } retorna 201 { id, status: PENDING } e atualiza reserva conforme simulação

---

## Phase 9: User Story 7 - Avaliações de Hóspedes Pós-Estadia (Priority: P3)

**Goal**: Apenas clientes com estadia concluída podem avaliar; permitir criar, editar e excluir avaliações

**Independent Test**: Usuário com reserva.status == COMPLETED cria avaliação (POST /reviews) e visualiza avaliações públicas; tentar avaliar sem reserva concluída retorna 403

- [ ] T031 [US7] Criar componente ReviewsList em sdd-jp/src/components/ReviewsList.jsx e ReviewForm em sdd-jp/src/components/ReviewForm.jsx (sdd-jp/src/components/ReviewsList.jsx, sdd-jp/src/components/ReviewForm.jsx)
 - [ ] T032 [US7] Implementar serviço de reviews em sdd-jp/src/services/reviews.js com funções createReview, updateReview, deleteReview, fetchReviews (sdd-jp/src/services/reviews.js)

 - [ ] T040 [P] [US7] Teste de contrato: criar teste em tests/contract/test_reviews_contract.js que valida POST /reviews com { reservaId, avaliacao, comentario } retorna 201 quando reserva.status == COMPLETED e retorna 403 caso contrário; valida constraint única reservaId+usuarioId
- [ ] T033 [US7] Integrar display de reviews em sdd-jp/src/pages/RoomDetails.jsx para exibir lista pública e botão de criar review quando elegível (sdd-jp/src/pages/RoomDetails.jsx)

---

## Final Phase: Polish & Cross-Cutting Concerns

- [ ] T034 [P] Atualizar quickstart e documentação de uso em specs/001-hotel-reservation-system/quickstart.md (specs/001-hotel-reservation-system/quickstart.md)
- [ ] T035 [P] Adicionar scripts de lint/build em sdd-jp/package.json (scripts: "lint", "build", "preview") e rodar checagem de build (sdd-jp/package.json)
 - [ ] T041 [P] Implementar utilitário de formatação monetária em sdd-jp/src/utils/format.js: export function formatCurrencyPTBR(value) usando Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }) e substituir exibições de preço em RoomCard, Booking, Payment e BookingConfirmation para usar essa função (sdd-jp/src/utils/format.js)
 - [ ] T042 [P] Implementar utilitário de formatação de datas em sdd-jp/src/utils/date.js: export function formatDatePTBR(isoDate) -> 'dd/MM/yyyy' e usar em DateRangePicker, RoomDetails, BookingConfirmation e Profile (sdd-jp/src/utils/date.js)
 - [ ] T043 [P] Implementar utilitário de CPF em sdd-jp/src/utils/cpf.js com funções maskCPF(cpfDigits) -> '000.000.000-00' e unmaskCPF(masked) -> digits; usar máscara em Register.jsx e Profile.jsx e enviar somente dígitos ao backend (sdd-jp/src/utils/cpf.js)
 - [ ] T044 [P] Garantir que os services enviem números/decimais como valores numéricos JSON (ex: 1234.56) e que a formatação para pt-BR seja aplicada somente na camada de exibição (RoomCard, Booking, Payment)

---

## Dependencies & Execution Order

- Phase 1 (Setup) -> Phase 2 (Foundational) -> Phase 3 (US1 MVP) -> Phases 4..9 (US2..US7) -> Final Phase (Polish)
- Foundational (Phase 2) blocks all user stories; dentro de cada história, modelos -> serviços -> páginas/componentes

## Parallel Execution Examples

- User Story 1 parallel: T012 (RoomCard), T013 (fetchRooms), T015 (estilos) podem ser feitos em paralelo após T011 estruturar a página
- User Story 2 parallel: T016 (Rooms page UI), T017 (searchRooms), T019 (DateRangePicker) são paralelizáveis [P]
- Fundação parallel: T005, T006, T008, T009 são independentes e podem ser trabalhadas em paralelo quando não houver conflito de arquivos

## Implementation Strategy (MVP first)

1. Completar Phase 1 e Phase 2
2. Implementar Phase 3 (US1) como MVP e validar independentemente
3. Em seguida, implementar US2 (consulta/availability) e US3 (auth)
4. Iterar sobre US4..US7 e finalizar com Polish
