## Contratos da API

Base URL: http://localhost:8080/api

1) Autenticação
- POST /auth/register
  Requisição: { nome, cpf, email, telefone?, dataNascimento?, senha, acceptTerms }
  Resposta: 201 { id, nome, email }

- POST /auth/login
  Requisição: { email, senha }
  Resposta: 200 { token: JWT, expiresIn }

- GET /auth/me
  Headers: Authorization: Bearer <token>
  Resposta: 200 { id, nome, email, telefone, dataNascimento }

- PUT /auth/me
  Headers: Authorization: Bearer <token>
  Requisição: { nome?, telefone?, dataNascimento?, senha? }
  Resposta: 200 { id, nome, email, telefone, dataNascimento }

2) Quartos
- GET /rooms?dataInicio=yyyy-mm-dd&dataFim=yyyy-mm-dd&adults=&children=&category=&minPrice=&maxPrice=
  Resposta: 200 [ { id, nome, categoria, capacidadeAdultos, capacidadeCriancas, precoPorNoite, fotos, comodidades } ]

- GET /rooms/{id}
  Resposta: 200 { detalhes completos do quarto (campos: id, codigo, nome, categoria, descricao, capacidadeAdultos, capacidadeCriancas, camas, precoPorNoite, comodidades, fotos) }

3) Reservas
- POST /reservations
  Headers: Authorization
  Requisição: { quartoId, dataInicio, dataFim, adultos, criancas }
  Resposta: 201 { id, codigo, status: PENDING, valorTotal, diaria, dataInicio, dataFim }
  Erros: 409 Conflict (data indisponível), 400 Bad Request (validação)

- GET /reservations (consultar por usuário)
  Headers: Authorization
  Resposta: 200 [ { resumo das reservas } ]

- GET /reservations/{id}
  Headers: Authorization (proprietário)
  Resposta: 200 { detalhes da reserva }

- POST /reservations/{id}/cancel
  Headers: Authorization
  Resposta: 200 { status: CANCELLED }

4) Pagamentos (Simulados)
- POST /payments
  Headers: Authorization
  Requisição: { reservaId, metodo, payload? }
  Resposta: 201 { id, status: PENDING }
  Observação: O back-end irá simular o resultado (SUCCESS/FAILED) e atualizar a reserva

- GET /payments/{id}
  Headers: Authorization
  Resposta: 200 { detalhes do pagamento }

5) Avaliações
- POST /reviews
  Headers: Authorization
  Requisição: { reservaId, avaliacao, comentario }
  Resposta: 201 { id, avaliacao, comentario }
  Erros: 403 Forbidden (se a reserva não estiver concluída), 409 Conflict (avaliação duplicada - constraint única em reservaId+usuarioId)

- PUT /reviews/{id}
  Headers: Authorization
  Requisição: { avaliacao, comentario }
  Resposta: 200 { avaliação atualizada }

- DELETE /reviews/{id}
  Headers: Authorization
  Resposta: 204 No Content

Autenticação: JWT no header Authorization. Verificações de propriedade devem ser aplicadas no servidor.

Formatação e Locale

- Observação importante sobre formatos e apresentação:
  - O protocolo da API usa JSON com tipos numéricos (números decimais com ponto) e datas em ISO 8601 (yyyy-mm-dd / datetimes ISO). Não enviar valores formatados com vírgula/thousands separators no corpo das requisições JSON: utilize números crus (ex: 1234.56) para campos monetários.
  - O frontend deve apresentar valores e datas ao usuário no padrão pt-BR: números monetários com separador decimal ',' e separador de milhares '.' (ex.: "R$ 1.234,56") e datas no formato dd/MM/yyyy. Implementar utilitários de formatação no frontend e usar máscara para CPF ('000.000.000-00') enquanto enviar CPF sem formatação ao backend (somente dígitos).
