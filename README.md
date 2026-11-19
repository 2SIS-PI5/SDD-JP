# SDD-JP

## Projeto e integrantes

Aplicação React + Vite que consome uma API mock (JSON Server) para **consultar e cadastrar solicitações de reserva de hotel**. É uma demonstração acadêmica: não há autenticação nem verificação real de disponibilidade.

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

Outros comandos: `npm test`, `npm run lint`, `npm run build`. A URL da API pode ser alterada com a variável `VITE_API_URL`.

## Onde estão os artefatos

- Constituição: `.specify/memory/constitution.md`
- Especificação, plano, tarefas e contrato: `specs/001-hotel-reservation-system/` (`spec.md`, `plan.md`, `tasks.md`, `contracts/api.md`, `data-model.md`, `quickstart.md`)
- Contrato de dados da API: `db.json`
- Código: `sdd-jp/src/api`, `sdd-jp/src/components`, `sdd-jp/src/pages`
- Testes: `sdd-jp/src/api/reservas.test.js` e `sdd-jp/src/pages/ReservasPage.test.jsx`

## Reflexão

**[PREENCHER pelo grupo: o que o SDD ajudou, o que atrapalhou, o que o grupo faria diferente. Escrevam com as próprias palavras, com base na experiência de vocês.]**
