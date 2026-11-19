# Especificação: Listagem e Cadastro de Reservas

**Feature Branch**: `main`
**Criado**: 19 de novembro de 2026
**Status**: Rascunho para revisão coletiva
**Entrada**: Uma funcionalidade de reservas do Hotel Servilha que permite consultar dados, cadastrar uma solicitação e apresentar erros de comunicação.

## Cenários de Usuário e Testes

### História de Usuário 1: Consultar e cadastrar reservas (Prioridade: P1)

Como visitante do Hotel Servilha, quero consultar os quartos e as solicitações de reserva existentes e cadastrar uma nova solicitação, para registrar o período e a acomodação desejados.

**Por que esta prioridade**: É a única jornada necessária para demonstrar uma funcionalidade completa que lê e grava dados por meio de uma API.

**Teste independente**: Com o serviço de dados disponível, abrir a página apresenta quartos e reservas; enviar um formulário válido cria uma solicitação e ela aparece uma única vez na lista.

**Cenários de aceitação**:

1. **Dado** que existem quartos e reservas, **quando** a pessoa abre a página, **então** os dados são apresentados e cada reserva identifica seu quarto.
2. **Dado** que o formulário contém hóspede, quarto, datas válidas e quantidade de pessoas dentro da capacidade, **quando** a pessoa confirma, **então** a solicitação é registrada e aparece na lista.
3. **Dado** que a data de saída é igual ou anterior à entrada, ou que a quantidade de pessoas excede a capacidade, **quando** a pessoa tenta confirmar, **então** a solicitação não é enviada e os campos inválidos recebem uma mensagem clara.
4. **Dado** que a consulta inicial falha, **quando** a página tenta carregar, **então** uma mensagem de erro é apresentada e a pessoa pode tentar novamente.
5. **Dado** que o cadastro falha, **quando** a pessoa confirma, **então** uma mensagem de erro é apresentada e os dados preenchidos permanecem no formulário.

### Casos de borda

- A lista de quartos ou de reservas pode estar vazia; a página deve informar que não há registros, sem tratar isso como erro.
- A API pode falhar ao carregar qualquer uma das listas; a interface deve informar qual operação falhou e permitir nova tentativa.
- A API pode rejeitar o cadastro; a interface não deve exibir confirmação nem apagar os valores preenchidos.
- Uma resposta de sucesso sem o registro criado não deve produzir uma entrada duplicada na lista.

## Requisitos

### Requisitos funcionais

- **RF-001**: A pessoa usuária deve conseguir visualizar os quartos cadastrados para seleção e as solicitações de reserva retornadas pelo serviço de dados.
- **RF-002**: A pessoa usuária deve conseguir enviar uma solicitação com nome do hóspede, quarto, data de entrada, data de saída e quantidade de pessoas.
- **RF-003**: O sistema deve exigir os campos obrigatórios, validar que a data de saída seja posterior à entrada e que a quantidade de pessoas não exceda a capacidade do quarto selecionado.
- **RF-004**: Após o serviço confirmar o cadastro, o sistema deve apresentar a solicitação recém-criada na lista sem duplicá-la.
- **RF-005**: Em falha ao consultar dados, o sistema deve informar o erro e disponibilizar nova tentativa.
- **RF-006**: Em falha ao cadastrar, o sistema deve informar o erro e preservar os valores do formulário.

### Entidades principais

- **Quarto**: acomodação selecionável, identificada por código, nome e capacidade máxima de pessoas.
- **Solicitação de reserva**: pedido de hospedagem com identificador, nome do hóspede, quarto, datas de entrada e saída, quantidade de pessoas e estado inicial.

## Critérios de sucesso

- **CS-001**: Com respostas válidas do serviço, quartos e solicitações existentes são exibidos sem intervenção manual.
- **CS-002**: Uma solicitação válida aceita pelo serviço aparece uma vez na lista após o envio.
- **CS-003**: Dados inválidos impedem o envio e produzem mensagens associadas aos campos relevantes.
- **CS-004**: Falhas de consulta e cadastro produzem mensagens compreensíveis; a nova tentativa de consulta e a preservação do formulário após falha de cadastro são verificáveis.

## Premissas e limites

- A aplicação é uma demonstração acadêmica; não autentica pessoas nem processa dados pessoais reais.
- Os quartos e as solicitações são fornecidos por um serviço de dados. O comportamento de erro desse serviço faz parte da funcionalidade.
- O cadastro registra uma solicitação demonstrativa; não confirma disponibilidade em tempo real nem garante uma reserva contra concorrência.
- Login, perfil, cancelamento, pagamento, avaliações, painel administrativo e back-end próprio estão fora do escopo desta funcionalidade.
- A tecnologia do serviço de dados será definida no plano; a especificação descreve o resultado esperado para a pessoa usuária.
