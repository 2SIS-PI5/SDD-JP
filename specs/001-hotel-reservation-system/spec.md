# Especificação: Hotel Servilha - Sistema Web de Reservas de Hotel

**Nome da Funcionalidade**: Sistema de Reservas Hotel Servilha
**Data**: 12 de Novembro de 2026
**Status**: Especificado

## 1. Resumo Executivo e Objetivo

Desenvolver uma aplicação Full Stack para reservas de hotel com foco exclusivo na experiência do cliente para o **Hotel Servilha**. O sistema permite que visitantes conheçam o estabelecimento, consultem acomodações, verifiquem disponibilidade em tempo real, realizem cadastro e login, efetuem reservas, gerenciem perfis pessoais, realizem pagamentos simulados e enviem avaliações após hospedagens concluídas.

A aplicação possui Front-end em React.js (com Vite, Tailwind CSS, React Router, Context API) e Back-end em Java 21 Spring Boot com Spring Security, JWT, JPA/Hibernate, e banco de dados MySQL gerenciado via migrations Flyway. Nenhuma tela ou funcionalidade administrativa / de funcionários é incluída.

## 2. Cenários de Usuário e Testes

### História de Usuário 1: Explorar Informações do Hotel (Público)
Como visitante, quero visualizar a página inicial do hotel contendo banner principal, apresentação, descrição das acomodações, comodidades, galeria de fotos, avaliações de hóspedes, localização e informações de contato, para decidir me hospedar no Hotel Servilha.
- **Teste de Aceitação**: O visitante acessa a aplicação, visualiza todas as seções da página inicial claramente e pode clicar em botões para pesquisar quartos ou acessar login/cadastro.

### História de Usuário 2: Consultar Quartos e Disponibilidade
Como visitante/hóspede, quero filtrar e pesquisar quartos por data de entrada, data de saída, quantidade de adultos e crianças, categoria, faixa de preço e capacidade, para encontrar acomodações disponíveis que atendam às minhas necessidades.
- **Teste de Aceitação**: Ao inserir os critérios de pesquisa, o sistema consulta o back-end para verificar a disponibilidade em relação às reservas existentes e exibe os quartos correspondentes com fotografias, comodidades, capacidade e valor da diária.

### História de Usuário 3: Cadastro de Clientes e Login Seguro
Como novo cliente, quero me cadastrar com validação (CPF, e-mail único, senha forte, aceite de termos) e fazer login seguro via JWT, para acessar minha área privada e realizar reservas.
- **Teste de Aceitação**: O cadastro valida todos os campos e armazena senhas criptografadas com BCrypt. O login retorna um token JWT válido que persiste entre sessões e protege rotas privadas.

### História de Usuário 4: Fluxo Completo de Reserva
Como cliente autenticado, quero selecionar datas, informar hóspedes, escolher uma acomodação, revisar detalhes e resumo financeiro, e confirmar minha reserva, recebendo um código de confirmação único.
- **Teste de Aceitação**: O back-end valida regras de datas, capacidade do quarto e previne conflitos. O valor total é calculado no back-end e a reserva é persistida com sucesso, retornando o código de confirmação.

### História de Usuário 5: Área Pessoal e Gestão de Reservas
Como cliente, quero visualizar e editar meu perfil (nome, telefone, senha) e acompanhar minhas reservas (futuras, em andamento, concluídas e canceladas), podendo cancelar conforme as regras de negócio.
- **Teste de Aceitação**: O cliente acessa sua área privada, atualiza dados cadastrais, visualiza reservas categorizadas e cancela reservas elegíveis sem bloquear registros passados/concluídos.

### História de Usuário 6: Processamento de Pagamento Simulado
Como cliente com reserva pendente, quero selecionar um método de pagamento (PIX, cartão de crédito, cartão de débito ou pagamento na recepção), processar a simulação e visualizar o histórico de transações e comprovante.
- **Teste de Aceitação**: A simulação de pagamento registra tentativas, atualiza o status do pagamento e da reserva corretamente e disponibiliza um comprovante demonstrativo sem cobranças financeiras reais.

### História de Usuário 7: Avaliações de Hóspedes Pós-Estadia
Como cliente com estadia concluída, quero enviar uma avaliação de 1 a 5 estrelas com comentário textual, visualizar avaliações públicas e editar ou excluir minha própria avaliação.
- **Teste de Aceitação**: Somente clientes com hospedagens concluídas podem avaliar. As avaliações aparecem na listagem pública e podem ser modificadas ou removidas pelo autor.

## 3. Requisitos Funcionais

### 3.1 Página Inicial e Consulta de Quartos
- Exibir banner principal com imagens do hotel, nome ("Hotel Servilha"), apresentação, comodidades, galeria de fotografias, avaliações de hóspedes, informações de localização e de contato.
- Catálogo de quartos com fotografias, nome e categoria, descrição, capacidade máxima, quantidade de camas, comodidades, valor da diária e informações adicionais.
- Filtros de pesquisa: Data de entrada, data de saída, quantidade de adultos, quantidade de crianças, categoria do quarto, faixa de preço, capacidade de hóspedes.
- Consulta de disponibilidade em tempo real no back-end considerando reservas existentes não canceladas.

### 3.2 Autenticação e Perfil
- Formulário de cadastro: Nome completo, CPF, e-mail, telefone, data de nascimento, senha, confirmação de senha e aceite dos termos de uso e política de privacidade.
- Validações: E-mails duplicados proibidos, validação de CPF, validação de formato de e-mail, campos obrigatórios, requisitos mínimos de senha, armazenamento seguro com BCrypt.
- Autenticação: Login com e-mail e senha via JWT, controle de sessão, logout, proteção de rotas privadas, recuperação de senha e persistência segura. Acesso restrito aos dados da própria conta.
- Perfil: Visualizar dados cadastrais, editar nome, telefone e informações permitidas, consultar e-mail e alterar senha.

### 3.3 Processo de Reserva
- Fluxo completo: Selecionar data de entrada -> selecionar data de saída -> informar hóspedes -> apresentar quartos disponíveis -> escolher acomodação -> exibir detalhes e resumo financeiro -> confirmar reserva -> registrar no banco de dados e retornar código de confirmação e detalhes (código, quarto, datas, hóspedes, diárias, valor da diária, valor total, data de realização, status).
- Regras de Negócio: Proibir datas inválidas, saída posterior à entrada, proibir conflitos de reservas, validar capacidade do quarto, calcular valor total no back-end, impedir acesso cruzado entre clientes, garantir consistência em reservas simultâneas, reservas canceladas liberam disponibilidade.

### 3.4 Módulo de Pagamentos (Simulado)
- Métodos suportados: PIX, cartão de crédito, cartão de débito, pagamento na recepção.
- Funcionalidades: Visualizar valor a pagar, consultar método de pagamento, consultar status, histórico de pagamentos e confirmação/comprovante.
- Regras: Simulação totalmente funcional (sem cobranças reais), registro de tentativas no banco de dados, atualização de status de pagamento e reserva, sem armazenamento de dados reais de cartões.

### 3.5 Módulo de Avaliações
- Funcionalidades: Avaliação de 1 a 5 estrelas, comentário textual, data da avaliação e listagem pública de avaliações.
- Regras: Restrito a clientes com hospedagem concluída, proibir avaliações duplicadas para a mesma estadia, permitir edição e exclusão da própria avaliação pelo autor.

## 4. Critérios de Sucesso

- **Desempenho e Usabilidade**: 100% das páginas públicas e pesquisas de quartos carregam e retornam resultados em menos de 2 segundos.
- **Segurança e Integridade**: 100% das senhas criptografadas com BCrypt; isolamento estrito de dados garantindo que usuários não acessem dados de outras contas.
- **Confiabilidade de Reservas**: O back-end bloqueia 100% de reservas conflitantes e calcula corretamente os valores totais sem manipulação no front-end.
- **Funcionalidade Ponta a Ponta**: Os clientes conseguem realizar com sucesso o cadastro, login, busca de quartos, reserva, simulação de pagamento, gestão de perfil e envio de avaliações de forma totalmente integrada.
