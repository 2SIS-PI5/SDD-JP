# Constituição do Projeto SDD-JP

## Princípios Fundamentais

### I. Escopo da atividade
Entregar uma única funcionalidade completa que consome uma API HTTP em um projeto React criado com Vite. Não ampliar o trabalho para um sistema hoteleiro completo.

### II. Especificação antes do plano
A spec deve ser construída e revisada pelo grupo em uma única sessão do SpecKit. O grupo lê o texto em voz alta, corrige imprecisões e só inicia o planejamento após concordância de todos.

### III. Contratos explícitos
O contrato da API mock deve estar documentado no `db.json`, incluindo recursos, campos e valores de exemplo necessários para executar a funcionalidade.

### IV. Validação visível
O fluxo principal, os dados inválidos e as falhas de comunicação devem ter resultados observáveis e critérios de aceitação verificáveis. Nenhum erro de API deve ser apresentado como sucesso.

### V. Simplicidade e transparência
Implementar apenas o necessário para a feature aprovada. O grupo revisa os artefatos, contribui com alterações próprias, registra a divisão de tarefas e usa commits pequenos e descritivos.

## Restrições

- Front-end obrigatório: React com Vite.
- Estrutura obrigatória para o front-end: `src/api`, `src/components` e `src/pages`.
- A funcionalidade deve consumir uma API HTTP. JSON Server com `db.json` é o mock recomendado quando não há back-end.
- Não são requisitos desta atividade Spring Boot, Oracle, MySQL, autenticação, pagamentos, avaliações ou painel administrativo.
- A aplicação e os dados de exemplo são acadêmicos; não incluir credenciais ou dados pessoais reais.
- Artefatos SpecKit, código e README preenchido devem permanecer versionados no repositório do grupo.

## Fluxo de Trabalho e Qualidade

1. Revisar a spec coletivamente e registrar as correções antes do plano.
2. Gerar plano e tarefas pelo SpecKit; dividir tarefas entre os integrantes e registrar responsáveis nos artefatos do projeto.
3. Implementar apenas tarefas aprovadas, com testes para listagem, cadastro, validação e comportamento de erro.
4. Executar os testes, lint e build; validar também o fluxo com a API em execução.
5. Manter commits pequenos, claros e relacionados ao trabalho do grupo; não iniciar uma nova funcionalidade antes de validar a atual.
6. Preencher o README com tema e integrantes, framework, comandos, localização dos artefatos, divisão de tarefas e reflexão da atividade.

## Governança

Esta constituição complementa a atividade e a spec aprovada. Em caso de conflito, prevalece o escopo mínimo da atividade e a decisão registrada pelo grupo. Qualquer ampliação de escopo exige nova concordância coletiva antes da implementação.

**Versão**: 1.0.0 | **Ratificada**: 19 de novembro de 2026 | **Última alteração**: 19 de novembro de 2026
