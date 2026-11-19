# Plano de Implementação: Listagem e Cadastro de Reservas

**Branch**: `main` | **Data**: 19 de novembro de 2026 | **Spec**: [spec.md](./spec.md)

**Entrada**: Especificação aprovada pelo grupo em `specs/001-hotel-reservation-system/spec.md`.

## Resumo

Implementar uma página React/Vite para listar quartos e solicitações de reserva, cadastrar uma solicitação e apresentar erros de consulta ou gravação. A aplicação consumirá uma API HTTP local fornecida por JSON Server, com o contrato documentado em `db.json` e `contracts/api.md`. O escopo não inclui servidor próprio, banco relacional, autenticação ou confirmação de disponibilidade.

## Contexto Técnico

**Linguagem/Versão**: JavaScript ES modules, React 19, Vite 8, Node.js 20.19 ou superior.

**Dependências Principais**: JSON Server para a API mock; Vitest, jsdom e React Testing Library para testes. Usar `fetch` nativo para as três operações HTTP, sem adicionar cliente HTTP.

**Armazenamento**: `db.json` na raiz do repositório, gerenciado pelo JSON Server.

**Testes**: Vitest e React Testing Library. Testes automatizados cobrem API e interface com respostas controladas; o quickstart valida o fluxo manual contra JSON Server real.

**Plataforma Alvo**: Navegadores modernos em ambiente local de desenvolvimento.

**Tipo de Projeto**: Front-end React SPA com API mock HTTP local.

**Metas de Desempenho**: Sem meta quantitativa definida pela atividade. A interface deve mostrar carregamento enquanto consulta e responder após a conclusão da chamada.

**Restrições**: Manter a estrutura obrigatória `sdd-jp/src/api`, `sdd-jp/src/components` e `sdd-jp/src/pages`; tratar erros de rede e HTTP; usar somente dados demonstrativos; não afirmar que a disponibilidade foi confirmada.

**Escopo/Escala**: Uma página, dois recursos (`quartos`, `reservas`) e três operações (`GET /quartos`, `GET /reservas`, `POST /reservas`).

## Verificação da Constituição

Gate anterior à pesquisa: **APROVADO**. A feature atende React/Vite, consome uma API HTTP, mantém o contrato no `db.json`, cobre listagem/cadastro/erro e permanece em uma única jornada. Não requer Spring, Oracle ou MySQL.

Gate após o design: **APROVADO**. JSON Server é explicitamente permitido pela atividade; os testes cobrem sucesso, validação e falhas; a estrutura de pastas obrigatória será respeitada.

## Estrutura do Projeto

### Documentação desta feature

```text
specs/001-hotel-reservation-system/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/api.md
├── checklists/requirements.md
└── tasks.md
```

### Código-fonte

```text
db.json
sdd-jp/
├── package.json
├── vite.config.js
└── src/
	├── api/
	│   ├── reservas.js
	│   └── reservas.test.js
	├── components/
	│   ├── FormularioReserva.jsx
	│   ├── FormularioReserva.test.jsx
	│   └── ListaReservas.jsx
	├── pages/
	│   └── ReservasPage.jsx
	├── setupTests.js
	├── App.jsx
	└── main.jsx
```

**Decisão de Estrutura**: Manter o Vite existente em `sdd-jp/`, colocar a API HTTP em `src/api`, os componentes compartilhados em `src/components` e o fluxo de página em `src/pages`. Não criar outro front-end nem um back-end Java.

## Rastreamento de Complexidade

Nenhuma violação da constituição ou abstração adicional é necessária para esta feature.
