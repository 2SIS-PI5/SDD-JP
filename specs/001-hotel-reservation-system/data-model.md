# Modelo de Dados: Listagem e Cadastro de Reservas

O JSON Server usa as coleções `quartos` e `reservas` na raiz de `db.json`. Os identificadores são strings atribuídas pelo serviço.

## Quarto

- `id`: string, identificador do quarto.
- `nome`: string não vazia, nome de exibição.
- `capacidadeMaxima`: inteiro maior que zero, total máximo de hóspedes aceito no formulário.

## Solicitação de reserva

- `id`: string, gerado pelo JSON Server na criação.
- `hospede`: string não vazia, nome demonstrativo do hóspede.
- `quartoId`: string, referência a um quarto existente.
- `dataInicio`: string no formato ISO `YYYY-MM-DD`.
- `dataFim`: string no formato ISO `YYYY-MM-DD`.
- `quantidadePessoas`: inteiro maior que zero.
- `status`: valor inicial fixo `SOLICITADA`, definido pela aplicação e não editável no formulário.

## Validações do formulário

- `hospede` é obrigatório após remover espaços nas extremidades.
- `quartoId` deve identificar um quarto retornado pelo serviço.
- `dataInicio` e `dataFim` são obrigatórias e `dataFim` deve ser posterior a `dataInicio`.
- `quantidadePessoas` deve ser um inteiro entre 1 e a `capacidadeMaxima` do quarto escolhido.
- A aplicação registra uma solicitação demonstrativa; não valida conflito entre datas nem confirma disponibilidade.

## Exemplo de `db.json`

```json
{
	"quartos": [
		{ "id": "quarto-101", "nome": "Suíte Jardim", "capacidadeMaxima": 2 },
		{ "id": "quarto-201", "nome": "Suíte Família", "capacidadeMaxima": 4 }
	],
	"reservas": [
		{
			"id": "reserva-001",
			"hospede": "Hóspede de demonstração",
			"quartoId": "quarto-101",
			"dataInicio": "2026-12-10",
			"dataFim": "2026-12-12",
			"quantidadePessoas": 2,
			"status": "SOLICITADA"
		}
	]
}
```
