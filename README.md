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

- **[PREENCHER pelo grupo: quem fez o quê — por exemplo, especificação, mock, componentes, fluxo de reserva, testes, documentação.]**

## Reflexão

**[PREENCHER pelo grupo: o que o SDD ajudou, o que atrapalhou, o que o grupo faria diferente. Escrevam com as próprias palavras, com base na experiência de vocês.]**
