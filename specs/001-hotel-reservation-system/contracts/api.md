## Contrato HTTP: Listagem e Cadastro de Reservas

**Servidor local**: `http://localhost:3000` (configurável por `VITE_API_URL`).

**Formato**: JSON em UTF-8. Não há autenticação nesta demonstração.

### `GET /quartos`

- **Sucesso**: `200 OK`, array de quartos conforme [data-model.md](../data-model.md).
- **Falha**: erro de rede ou resposta HTTP não-2xx; a página deve informar a falha e permitir nova tentativa.

### `GET /reservas`

- **Sucesso**: `200 OK`, array de solicitações de reserva conforme [data-model.md](../data-model.md).
- **Falha**: erro de rede ou resposta HTTP não-2xx; a página deve informar a falha e permitir nova tentativa.

### `POST /reservas`

- **Content-Type**: `application/json`.
- **Requisição**:

```json
{
  "hospede": "Hóspede de demonstração",
  "quartoId": "quarto-101",
  "dataInicio": "2026-12-10",
  "dataFim": "2026-12-12",
  "quantidadePessoas": 2,
  "status": "SOLICITADA"
}
```

- **Sucesso**: `201 Created`, retorna a solicitação com `id` atribuído pelo JSON Server.
- **Falha**: erro de rede ou resposta HTTP não-2xx; a interface informa a falha e preserva os valores do formulário.

O cliente valida campos obrigatórios, datas e capacidade antes do envio. Esse contrato não oferece disponibilidade em tempo real, prevenção de sobreposição de datas, autenticação ou confirmação definitiva da hospedagem.
