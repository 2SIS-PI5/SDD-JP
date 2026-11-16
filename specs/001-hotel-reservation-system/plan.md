 # Plano de Implementação: Sistema de Reservas Hotel Servilha

**Branch**: `001-hotel-reservation-system` | **Data**: 2026-11-16 | **Spec**: [spec.md](./spec.md)

**Entrada**: Especificação da funcionalidade em `/specs/001-hotel-reservation-system/spec.md`

## Resumo

Desenvolvimento do front-end em React.js (com Vite, Tailwind CSS, React Router DOM, Context API e Axios) para o **Hotel Servilha**, sistema de reservas focado no cliente. Inclui página inicial, catálogo de quartos com filtros e verificação de disponibilidade em tempo real, cadastro e login seguro via JWT, fluxo completo de reserva, área de perfil e gestão de reservas, pagamentos simulados (PIX, cartão, recepção) e sistema de avaliações pós-estadia.

## Contexto Técnico

**Linguagem/Versão**: JavaScript (ES6+) / React 19 / Node.js

**Dependências Principais**: React Router DOM, Axios, Tailwind CSS, React Hook Form (opcional)

**Armazenamento**: localStorage (para token JWT e sessão) e integração REST com Back-end Spring Boot (com fallback mock local)

**Testes**: ESLint, verificação de build do Vite

**Plataforma Alvo**: Navegadores modernos (Chrome, Firefox, Safari, Edge)

**Tipo de Projeto**: Aplicação Web (Single Page Application / Frontend)

**Metas de Desempenho**: Carregamento de páginas públicas e resultados de busca em < 2 segundos

**Restrições**: Não persistir dados reais de cartão de crédito; isolamento estrito de dados entre clientes; rotas privadas protegidas

**Escopo/Escala**: 7 fluxos/páginas principais (Home, Quartos, Detalhes do Quarto, Login/Cadastro, Minhas Reservas, Pagamento, Avaliações/Perfil)

## Verificação da Constituição

GATE: Deve ser aprovado antes da Fase 0 de pesquisa. Reavaliar após a Fase 1 de design.

- **Escopo Exclusivo do Cliente**: APROVADO. Nenhuma tela administrativa ou de funcionários incluída.
- **Segurança de Dados**: APROVADO. Senhas com BCrypt no back-end, sem armazenamento de dados de cartão e rotas protegidas por JWT.
- **Padrões Técnicos**: APROVADO. Uso previsto de React 19, Tailwind CSS, React Router DOM e Axios.

## Estrutura do Projeto

### Documentação (esta funcionalidade)

```text
specs/001-hotel-reservation-system/
├── plan.md              # Este ficheiro
├── research.md          # Saída da Fase 0
├── data-model.md        # Saída da Fase 1
├── quickstart.md        # Saída da Fase 1
├── contracts/           # Saída da Fase 1
└── tasks.md             # Saída da Fase 2 (criada posteriormente)
```

### Código Fonte (raiz do repositório)

```text
sdd-jp/
├── src/
│   ├── assets/
│   ├── components/      # Navbar, Footer, RoomCard, FilterBar, Modal, etc.
│   ├── context/         # AuthContext, BookingContext
│   ├── pages/           # Home, Rooms, RoomDetails, Login, Register, Profile, Bookings, Payment, Reviews
│   ├── services/        # api.js (configuração do Axios)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

**Decisão de Estrutura**: Aplicação SPA React em `sdd-jp/`, organizada em componentes, pages, context e services conforme as diretrizes do projeto e do AGENTS.md.

## Reavaliação Pós-Design

- Todas as gates da constituição reavaliadas após o design da Fase 1: APROVADO
- Observações: O design respeita o "Escopo Exclusivo do Cliente", as restrições de segurança (nenhum dado de cartão persistido) e as convenções de estrutura do projeto.
