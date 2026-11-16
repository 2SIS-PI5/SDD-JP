# data-model.md

Entidades, campos, relacionamentos e regras de validação derivados da especificação da funcionalidade.

1) Usuário (Cliente)
- id: UUID
- nome: string (obrigatório)
- cpf: string (obrigatório, único, validado)
- email: string (obrigatório, único, validado)
- telefone: string (opcional)
- dataNascimento: date (opcional)
- senhaHash: string (obrigatório)
- roles: ["CLIENT"]

Regras/validação:
- email único, formato válido
- cpf único, validação de formato
- senha armazenada como hash BCrypt (implementado no back-end)

2) Quarto
- id: UUID
- codigo: string (legível)
- nome: string
- categoria: string
- descricao: texto
- capacidadeAdultos: integer
- capacidadeCriancas: integer
- camas: integer
- precoPorNoite: decimal
- comodidades: array[string]
- fotos: array[Photo]

3) Reserva
- id: UUID
- codigo: string (código de confirmação único)
- usuarioId: UUID (FK -> Usuário)
- quartoId: UUID (FK -> Quarto)
- dataInicio: date
- dataFim: date
- noites: integer (computado)
- adultos: integer
- criancas: integer
- diaria: decimal (snapshot do precoPorNoite do quarto)
- valorTotal: decimal (calculado no back-end)
- status: enum [PENDING, CONFIRMED, CANCELLED, COMPLETED]
- createdAt, updatedAt

Regras/validação:
- dataFim > dataInicio
- convidados <= capacidade do quarto
- conflitos evitados no back-end (verificação transacional); reservas canceladas liberam disponibilidade

4) Pagamento (Simulado)
- id: UUID
- reservaId: UUID (FK)
- metodo: enum [PIX, CREDIT_CARD, DEBIT_CARD, RECEPTION]
- status: enum [PENDING, SUCCESS, FAILED]
- valor: decimal
- metadata: json (não armazenar dados reais de cartão)
- createdAt

Regras:
- Não persistir dados reais de cartão; armazenar apenas dados demonstrativos mascarados se necessário
- Cada tentativa de pagamento registrada; o status atualiza a reserva conforme apropriado

5) Avaliação
- id: UUID
- reservaId: UUID (FK)
- usuarioId: UUID (FK)
- avaliacao: integer (1..5)
- comentario: texto
- createdAt, updatedAt

Regras:
- Permitido apenas se reserva.status == COMPLETED
- Uma avaliação por reserva por usuário (constraint única em reservaId+usuarioId)

6) Foto (auxiliar)
- id, quartoId, url, legenda, ordem

Índices e restrições
- Unique(email), Unique(cpf), Unique(reserva.codigo), Unique(avaliacao reservaId+usuarioId)
- Índices em Quarto.precoPorNoite, Quarto.categoria para filtros

Transições de estado (Reserva)
- PENDING -> CONFIRMED (ao pagamento bem-sucedido ou confirmação manual)
- PENDING -> CANCELLED (cancelamento pelo usuário antes do check-in)
- CONFIRMED -> COMPLETED (após passagem da dataFim e registro de estadia)
- Qualquer -> CANCELLED (sujeito a regras de negócio)
