# Pesquisa e Decisões Técnicas: Listagem e Cadastro de Reservas

## Decisão: JSON Server como API HTTP

**Decisão**: Usar JSON Server com `db.json` na raiz do repositório, com as coleções `quartos` e `reservas`.

**Justificativa**: A atividade permite e recomenda JSON Server quando o grupo não possui back-end; o arquivo também documenta diretamente o contrato e os dados de demonstração.

**Alternativas consideradas**: Criar um back-end próprio ou integrar um banco relacional. Foram descartadas porque aumentariam o escopo além de uma funcionalidade React que consome uma API.

## Decisão: Fetch nativo

**Decisão**: Usar `fetch` nativo com uma função pequena para validar respostas HTTP e converter erros de rede/HTTP em erros tratáveis pela interface.

**Justificativa**: A feature tem apenas três operações HTTP e o navegador já fornece a API necessária. Não há necessidade de adicionar Axios.

**Alternativas consideradas**: Instalar um cliente HTTP adicional. Não acrescentaria capacidade necessária para este escopo.

## Decisão: Testes de interface e serviço

**Decisão**: Usar Vitest, jsdom e React Testing Library; controlar `fetch` nos testes automatizados e verificar o fluxo manual contra JSON Server pelo quickstart.

**Justificativa**: Essa combinação testa comportamento visível da página e chamadas da API sem exigir que o servidor mock esteja ativo durante a suíte automatizada.

**Alternativas consideradas**: Validar somente por inspeção manual. Rejeitada porque não protege os cenários de validação e falha da API contra regressões.

## Limite da reserva demonstrativa

**Decisão**: A aplicação registra uma solicitação e valida datas/capacidade no cliente; não declara disponibilidade confirmada.

**Justificativa**: JSON Server fornece persistência REST simples e não implementa transações ou regras de concorrência de hospedagem.

**Alternativas consideradas**: Simular uma confirmação garantida ou prevenção de conflitos concorrentes. Fora do escopo e não suportada pelo serviço escolhido.
