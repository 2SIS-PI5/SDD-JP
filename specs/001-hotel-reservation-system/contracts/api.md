## Contratos da API

Base URL: http://localhost:8080/api

1) Autenticação
- POST /auth/register
  Requisição: { name, cpf, email, phone?, birthDate?, password, acceptTerms }
  Resposta: 201 { id, name, email }

- POST /auth/login
  Requisição: { email, password }
  Resposta: 200 { token: JWT, expiresIn }

- GET /auth/me
  Headers: Authorization: Bearer <token>
  Resposta: 200 { id, name, email, phone, birthDate }

2) Quartos
- GET /rooms?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd&adults=&children=&category=&minPrice=&maxPrice=
  Resposta: 200 [ { id, name, category, capacityAdults, capacityChildren, pricePerNight, photos, amenities } ]

- GET /rooms/{id}
  Resposta: 200 { detalhes completos do quarto }

3) Reservas
- POST /reservations
  Headers: Authorization
  Requisição: { roomId, startDate, endDate, guestsAdults, guestsChildren }
  Resposta: 201 { id, code, status: PENDING, totalAmount, dailyRate, startDate, endDate }
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
  Requisição: { reservationId, method, payload? }
  Resposta: 201 { id, status: PENDING }
  Observação: O back-end irá simular o resultado (SUCCESS/FAILED) e atualizar a reserva

- GET /payments/{id}
  Headers: Authorization
  Resposta: 200 { detalhes do pagamento }

5) Avaliações
- POST /reviews
  Headers: Authorization
  Requisição: { reservationId, rating, comment }
  Resposta: 201 { id, rating, comment }
  Erros: 403 Forbidden (se a reserva não estiver concluída), 409 Conflict (avaliação duplicada)

- PUT /reviews/{id}
  Headers: Authorization
  Requisição: { rating, comment }
  Resposta: 200 { avaliação atualizada }

- DELETE /reviews/{id}
  Headers: Authorization
  Resposta: 204 No Content

Autenticação: JWT no header Authorization. Verificações de propriedade devem ser aplicadas no servidor.
