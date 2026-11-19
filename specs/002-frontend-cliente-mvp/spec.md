# Especificação: Experiência do cliente — MVP

**Feature Branch**: `feature/mvp-frontend-cliente`
**Criado**: 19 de novembro de 2026
**Status**: Aprovado pelo grupo para o MVP
**Entrada**: Evoluir o front-end existente para uma experiência de hotelaria voltada exclusivamente ao cliente, reaproveitando o mock JSON Server.

## História de Usuário 1: Descobrir, reservar e acompanhar a hospedagem (P1)

Como visitante do Hotel Sereno, quero conhecer as acomodações, consultar disponibilidade, solicitar uma reserva com pagamento simulado e acompanhar minhas reservas, para viver uma experiência completa de reserva.

**Teste independente**: sem autenticação é possível navegar, filtrar acomodações e consultar disponibilidade. Após cadastro e login, é possível concluir a reserva, pagar de forma simulada e consultar a reserva na área do cliente.

**Cenários de aceitação**:

1. **Dado** que a API mock está disponível, **quando** a pessoa abre a página inicial, **então** vê o hotel, a busca e as acomodações em destaque.
2. **Dado** que a pessoa informa datas e hóspedes, **quando** busca, **então** vê apenas acomodações disponíveis no período.
3. **Dado** uma acomodação disponível, **quando** inicia a reserva, **então** percorre etapas de hospedagem, hóspede, revisão e pagamento simulado.
4. **Dado** um pagamento simulado aprovado, **quando** a confirmação chega, **então** a reserva recebe código e aparece em Minhas Reservas.
5. **Dado** um pagamento simulado recusado, **quando** o resultado chega, **então** a reserva não é confirmada e a pessoa pode tentar outra forma de pagamento.
6. **Dado** um usuário autenticado, **quando** acessa a área pessoal, **então** vê suas reservas, detalhes e perfil.
7. **Dado** que a API falha, **quando** uma tela tenta carregar, **então** há mensagem clara e ação de tentar novamente.

## Requisitos funcionais

- **RF-101**: Exibir página inicial com hero, busca, destaques, experiências e chamada para reserva.
- **RF-102**: Permitir busca por check-in, check-out, adultos, crianças e quantidade de quartos.
- **RF-103**: Listar acomodações com filtros de categoria, capacidade, preço e comodidades.
- **RF-104**: Exibir detalhe da acomodação com galeria, descrição, comodidades, política e painel de reserva.
- **RF-105**: Diferenciar catálogo (`/acomodacoes`) de resultados por disponibilidade (`/buscar`).
- **RF-106**: Centralizar a verificação de disponibilidade considerando reservas não canceladas.
- **RF-107**: Conduzir reserva em etapas com progresso, validação e resumo financeiro.
- **RF-108**: Simular pagamento por PIX ou cartão, com aprovação ou recusa, sem cobrança real.
- **RF-109**: Persistir usuário, reserva e pagamento no JSON Server.
- **RF-110**: Autenticar com senha armazenada como hash + salt, nunca em texto puro.
- **RF-111**: Oferecer área do cliente com reservas, detalhes, cancelamento e perfil.
- **RF-112**: Apresentar estados de carregamento, vazio, erro e sucesso.
- **RF-113**: Não expor nenhuma funcionalidade administrativa.

## Requisitos não funcionais

- **RNF-101**: Layout responsivo para smartphone, tablet, notebook e desktop.
- **RNF-102**: Navegação por teclado, labels, contraste e textos alternativos.
- **RNF-103**: Componentes pequenos, CSS Modules e tokens de design.
- **RNF-104**: Serviços desacoplados, prontos para troca de `VITE_API_URL` por um back-end Spring Boot.
- **RNF-105**: Testes automatizados dos serviços críticos e do fluxo de disponibilidade.
- **RNF-106**: Nenhum dado financeiro real; cartão apenas fictício e não persistido.

## Premissas e limites

- A API é o JSON Server com `db.json`; não há back-end Spring nesta entrega.
- Autenticação e pagamento são simulações acadêmicas e não servem para produção.
- A disponibilidade é calculada no cliente a partir das reservas do mock, sem garantia contra concorrência.
- Recuperação de senha é simulada, sem envio real de e-mail.
- Painel administrativo, gestão de funcionários, relatórios internos e conciliação financeira estão fora do escopo.
