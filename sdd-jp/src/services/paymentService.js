import api from './api.js'
import { atualizarReserva } from './reservationService.js'

export async function listarPagamentosDaReserva(reservaId) {
  const { data } = await api.get('/pagamentos', { params: { reservaId } })
  return data
}

export async function processarPagamento({ reservaId, metodo, valor, parcelas = 1, resultado = 'aprovar' }) {
  const aprovado = resultado === 'aprovar'
  const pagamento = {
    id: crypto.randomUUID(),
    reservaId,
    metodo,
    valor: Number(valor),
    parcelas: metodo === 'CARTAO_CREDITO' ? Number(parcelas) || 1 : 1,
    status: aprovado ? 'APROVADO' : 'REJEITADO',
    referencia: `SIM-${Date.now()}`,
    criadoEm: new Date().toISOString(),
  }

  const { data: criado } = await api.post('/pagamentos', pagamento)

  await atualizarReserva(reservaId, {
    statusPagamento: aprovado ? 'APROVADO' : 'REJEITADO',
    status: aprovado ? 'CONFIRMADA' : 'SOLICITADA',
  })

  return criado
}
