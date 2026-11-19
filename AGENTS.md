# AGENTS.md - Guia de Desenvolvimento da Atividade SDD-JP

Este repositório atende à atividade acadêmica de SDD com SpecKit. O grupo aprovou uma única funcionalidade: consultar quartos e solicitações de reserva, cadastrar uma solicitação e apresentar erros de comunicação. Todo o trabalho e a documentação devem permanecer em português.

## 1. Escopo e Stack

- Front-end obrigatório: React com Vite, localizado em `sdd-jp/`.
- Linguagem: JavaScript/JSX.
- API HTTP mock: JSON Server; `db.json` na raiz define e exemplifica o contrato de quartos e solicitações de reserva.
- Testes: Vitest e React Testing Library para validação de componentes, formulário e chamadas de dados.
- Esta atividade não exige back-end Spring, Oracle, MySQL.

## 2. Comandos

Executar na pasta `sdd-jp/` após instalar as dependências:

- Instalar dependências: `npm install`
- Iniciar Vite: `npm run dev`
- Executar testes: `npm test`
- Executar lint: `npm run lint`
- Criar build: `npm run build`

O comando para iniciar o JSON Server deve ser documentado no README e no quickstart após a configuração da API.

## 3. Estrutura e Padrões

- Manter os arquivos de API em `sdd-jp/src/api/`, componentes reutilizáveis em `sdd-jp/src/components/` e páginas em `sdd-jp/src/pages/`.
- Usar componentes funcionais React e os padrões de estilo já presentes no projeto; não adicionar bibliotecas de UI sem necessidade aprovada.
- Manter chamadas HTTP separadas dos componentes e tratar estados de carregamento, vazio, sucesso e erro.
- Validar nome do hóspede, quarto, datas e quantidade de pessoas conforme a spec. A falha ao carregar deve permitir nova tentativa; a falha ao cadastrar deve preservar os valores do formulário.

## 4. Limites

- Implementar apenas a funcionalidade aprovada em `specs/001-hotel-reservation-system/spec.md`.
- A solicitação cadastrada é demonstrativa; não afirmar que disponibilidade foi confirmada nem que a hospedagem está garantida.
- Não incluir dados pessoais ou credenciais reais em `db.json`, testes, commits ou documentação.
- Alterações de escopo exigem concordância do grupo e atualização dos artefatos SpecKit antes de implementar.

## 5. SpecKit e Fluxo de Trabalho

- Usar os comandos `/speckit.specify`, `/speckit.plan`, `/speckit.tasks` e `/speckit.implement` para as etapas correspondentes.
- A spec deve ser lida e aprovada pelo grupo antes do plano; tarefas e responsáveis devem ficar nos artefatos do repositório.
- Antes de concluir a feature, validar listagem, cadastro válido, validação do formulário, falha de leitura, falha de cadastro, lint e build.
- Completar o README conforme o modelo da atividade, incluindo framework, comandos, localização dos artefatos, contribuições e reflexão.

## 6. Padrão de Commits

- **Convenção**: Utilizar mensagens de commit padronizadas utilizando prefixos descritivos seguidos de dois-pontos e descrição clara (em português), tais como:
  - `add:` para adição de novos recursos, arquivos ou módulos estruturais.
  - `feat:` para novas funcionalidades implementadas.
  - `fix:` para correção de bugs.
  - `doc:` para documentação e guias.
  - `refactor:` para refatoração de código.
  - `test:` para testes automatizados.
