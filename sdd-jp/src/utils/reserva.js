import { paraISO } from './date.js'

export function gerarCodigoReserva(data = new Date()) {
  const base = paraISO(data).replaceAll('-', '')
  const sufixo = Math.floor(1000 + Math.random() * 9000)
  return `HSP-${base}-${sufixo}`
}

export function calcularTotais({ precoDiaria, diarias, quantidadeQuartos = 1 }) {
  const subtotal = Number(precoDiaria) * Number(diarias) * Number(quantidadeQuartos)
  const taxas = Math.round(subtotal * 0.1 * 100) / 100
  const total = Math.round((subtotal + taxas) * 100) / 100
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxas,
    total,
  }
}

export const STATUS_RESERVA = {
  SOLICITADA: { rotulo: 'Aguardando pagamento', tom: 'warning' },
  CONFIRMADA: { rotulo: 'Confirmada', tom: 'success' },
  CANCELADA: { rotulo: 'Cancelada', tom: 'danger' },
}

export const STATUS_PAGAMENTO = {
  PENDENTE: { rotulo: 'Pendente', tom: 'warning' },
  APROVADO: { rotulo: 'Aprovado', tom: 'success' },
  REJEITADO: { rotulo: 'Recusado', tom: 'danger' },
}
