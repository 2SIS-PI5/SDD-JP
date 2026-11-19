# Tarefas: Experiência do cliente — MVP

**Entrada**: `spec.md` e `plan.md` desta pasta.
**Testes**: obrigatórios para serviços críticos e disponibilidade.

## Fase 1 — Fundação

- [x] T201 Criar branch, instalar dependências e criar `.env.example`.
- [x] T202 Aplicar design tokens, fontes e estilos globais.
- [x] T203 Criar cliente Axios, utilitários de data, moeda e reserva.
- [x] T204 Registrar spec, plano e tarefas desta feature.

## Fase 2 — Componentes e layout

- [x] T205 Criar átomos: Button, Badge, Spinner, Alert, EmptyState, Rating.
- [x] T206 Criar Header responsivo e menu do usuário.
- [x] T207 Criar Footer institucional.
- [x] T208 Criar layouts público, autenticação e conta.

## Fase 3 — Home e catálogo

- [x] T209 Criar SearchBar com datas e hóspedes.
- [x] T210 Criar Home com hero, destaques e chamada de reserva.
- [x] T211 Criar catálogo `/acomodacoes` com filtros e ordenação.
- [x] T212 Criar card de acomodação reutilizável.

## Fase 4 — Detalhe e disponibilidade

- [x] T213 Criar página de detalhe com galeria e painel de reserva.
- [x] T214 Implementar `availabilityService` e testes de sobreposição.
- [x] T215 Criar `/buscar` com resultados disponíveis por data.

## Fase 5 — Reserva e pagamento

- [x] T216 Criar fluxo em etapas com progresso e validação Zod.
- [x] T217 Criar revisão financeira e persistência da reserva.
- [x] T218 Criar pagamento simulado PIX/cartão com aprovação e recusa.
- [x] T219 Criar confirmação com código e link para minhas reservas.

## Fase 6 — Cliente

- [x] T220 Criar auth simulada com hash + salt e contexto de sessão.
- [x] T221 Criar login, cadastro e recuperação simulada.
- [x] T222 Proteger rotas da área do cliente.
- [x] T223 Criar minhas reservas, detalhe, cancelamento e perfil.

## Fase 7 — Institucional e validação

- [x] T224 Criar Sobre, Contato e Avaliações.
- [x] T225 Ajustar responsividade, acessibilidade e estados visuais.
- [x] T226 Criar testes de serviços e fluxo de reserva.
- [x] T227 Executar testes, lint, build e atualizar README.

## Dependências

- T205–T208 antes das páginas.
- T211–T212 antes de T213–T215.
- T214 antes do fluxo de reserva.
- T220–T222 antes de T223.
- T226–T227 por último.
