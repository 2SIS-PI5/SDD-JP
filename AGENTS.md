# AGENTS.md - Guia de Desenvolvimento para Agentes (Hotel Servilha)

Este documento orienta agentes de IA e desenvolvedores no projeto **Hotel Servilha** (sistema full stack de reservas de hotel, voltado exclusivamente para clientes).

Observação: Todas as documentações e artefatos deste projeto serão escritos em português.

## 1. Stack Tecnológica e Versões

- **Front-end**:
  - React.js com Vite (`sdd-jp/`)
  - JavaScript / JSX (React 19)
  - React Router DOM
  - Axios para integração com a API
  - Tailwind CSS para estilização
  - Context API para autenticação e estado global
  - React Hook Form
- **Back-end (Planejado/Arquitetura da Especificação)**:
  - Java 21
  - Spring Boot (Spring Web, Spring Data JPA, Spring Security, Spring Validation)
  - Maven
  - JWT para autenticação, BCrypt para criptografia de senhas
- **Banco de Dados**:
  - MySQL
  - Hibernate/JPA
  - Flyway para migrations

---

## 2. Comandos Exatos

Executados na pasta do front-end (`sdd-jp`):

- **Instalação de dependências**:
  ```bash
  cd sdd-jp && npm install
  ```
- **Servidor de desenvolvimento**:
  ```bash
  cd sdd-jp && npm run dev
  ```
- **Build de produção**:
  ```bash
  cd sdd-jp && npm run build
  ```
- **Lint (ESLint)**:
  ```bash
  cd sdd-jp && npm run lint
  ```
- **Visualização do build (Preview)**:
  ```bash
  cd sdd-jp && npm run preview
  ```

---

## 3. Padrões de Código e Estrutura

- **Componentes React**: Utilizar componentes funcionais com Hooks.
- **Estilização**: Uso exclusivo de Tailwind CSS para classes utilitárias e design responsivo.
- **Gerenciamento de Estado**: Context API para autenticação global e dados do cliente.
- **Organização de Pastas (Front-end)**:
  - `src/components/`: Componentes reutilizáveis (cards, banners, modais, etc.)
  - `src/pages/`: Páginas principais (Home, Quartos, Reserva, Perfil, Minhas Reservas, Pagamento, Avaliações)
  - `src/context/`: Contextos globais (AuthContext, etc.)
  - `src/services/`: Configuração do Axios e chamadas à API REST

---

## 4. Restrições e Limites

- **Escopo Exclusivo do Cliente**: NUNCA desenvolver painel administrativo, área de funcionários ou gerenciamento interno do hotel. O sistema é 100% voltado para o cliente final.
- **Segurança**:
  - Proibido armazenar dados reais de cartões de crédito. Módulo de pagamento simulado.
  - Proibido expor senhas em texto plano (criptografia com BCrypt no back-end).
  - Rotas privadas protegidas por autenticação JWT.
  - Isolamento estrito de dados entre clientes (cada cliente acessa apenas suas próprias reservas e perfil).
- **Dados**: Não utilizar dados mockados permanentes para substituir regras de negócio reais quando integradas ao back-end Spring Boot e MySQL.

---

## 5. Decisões Arquiteturais e Regras de Negócio

- **Fluxo de Reserva**:
  1. Seleção de datas (entrada e saída) e quantidade de hóspedes.
  2. Consulta de disponibilidade em tempo real no back-end (considerando reservas existentes e excluindo canceladas).
  3. Escolha do quarto, resumo financeiro calculado no back-end, confirmação e geração de código de reserva.
- **Avaliações**: Somente clientes com hospedagens com status "concluída" podem avaliar o hotel (1-5 estrelas + comentário). Sem avaliações duplicadas para a mesma estadia.
- **Pagamento Simulado**: Suporta PIX, cartão de crédito, cartão de débito e pagamento na recepção com registro de transações e comprovante demonstrativo.

---

## 6. Padrão de Commits

- **Convenção**: Utilizar mensagens de commit padronizadas utilizando prefixos descritivos seguidos de dois-pontos e descrição clara (em português), tais como:
  - `add:` para adição de novos recursos, arquivos ou módulos estruturais.
  - `feat:` para novas funcionalidades implementadas.
  - `fix:` para correção de bugs.
  - `doc:` para documentação e guias.
  - `refactor:` para refatoração de código.
  - `test:` para testes automatizados.
