# Plano de Implementação: Experiência do cliente — MVP

**Branch**: `feature/mvp-frontend-cliente` | **Data**: 19 de novembro de 2026 | **Spec**: [spec.md](./spec.md)

## Resumo

Evoluir o front-end existente para uma aplicação React/Vite multipágina com identidade visual própria, catálogo de acomodações, busca por disponibilidade, fluxo de reserva em etapas, pagamento simulado, autenticação simulada e área do cliente. O mock continua sendo o JSON Server com `db.json`.

## Contexto técnico

- React 19, Vite 8, JavaScript/JSX.
- React Router para rotas, Axios para HTTP, React Hook Form + Zod para formulários, React Day Picker + date-fns para datas, CSS Modules e variáveis CSS.
- Serviços em `src/services` para isolar a API e permitir troca futura para Spring Boot.
- `src/api/reservas.js` e os testes existentes são preservados; a página antiga permanece no repositório, mas não é roteada.

## Estrutura do código

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── contexts/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
└── utils/
```

## Decisões

1. **Disponibilidade centralizada** em `availabilityService`, usada por `/buscar` e pelo fluxo de reserva.
2. **Catálogo x busca**: `/acomodacoes` apresenta o inventário; `/buscar` aplica datas e filtra conflitos.
3. **Auth simulada**: usuários no JSON Server com hash SHA-256 + salt; sessão no `localStorage`. Limitação documentada.
4. **Pagamento simulado**: PIX ou cartão fictício; a UI escolhe aprovação ou recusa; `pagamentos` é persistido e a reserva recebe `statusPagamento`.
5. **Sem administração**: nenhuma rota, menu ou componente administrativo.

## Contratos do mock

- `GET/POST/PATCH /quartos`, `GET/POST/PATCH /reservas`, `GET/POST /pagamentos`, `GET/POST /usuarios`, `GET/POST /avaliacoes`, `GET/POST /contatos`.
- Reserva criada com `status: SOLICITADA` e `statusPagamento: PENDENTE`; após pagamento aprovado, `CONFIRMADA`/`APROVADO`.

## Verificação

- `npm test`, `npm run lint`, `npm run build`.
- Fluxo manual do quickstart: busca, detalhe, reserva, pagamento aprovado/recusado, minha conta, cancelamento.
- Troca futura de API limitada a `VITE_API_URL` e aos serviços em `src/services`.

## Riscos

- JSON Server não implementa regras transacionais; a disponibilidade é uma simulação de cliente.
- `localStorage` não é seguro para produção; a sessão e o hash existem apenas para a demonstração acadêmica.
