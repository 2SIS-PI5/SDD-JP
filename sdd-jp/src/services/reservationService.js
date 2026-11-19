import api from './api.js'
import { gerarCodigoReserva } from '../utils/reserva.js'

export async function listarReservas() {
  const { data } = await api.get('/reservas')
  return data
}

export async function listarReservasDoUsuario(usuarioId) {
  const { data } = await api.get('/reservas', { params: { usuarioId } })
  return data.sort((a, b) => (b.criadaEm ?? '').localeCompare(a.criadaEm ?? ''))
}

export async function obterReserva(id) {
  const { data } = await api.get(`/reservas/${id}`)
  return data
}

export async function criarReserva(dados) {
  const payload = {
    ...dados,
    codigo: gerarCodigoReserva(),
    status: 'SOLICITADA',
    statusPagamento: 'PENDENTE',
    criadaEm: new Date().toISOString(),
  }
  const { data } = await api.post('/reservas', payload)
  return data
}

export async function atualizarReserva(id, dados) {
  const { data } = await api.patch(`/reservas/${id}`, dados)
  return data
}

export async function cancelarReserva(id) {
  return atualizarReserva(id, { status: 'CANCELADA' })
}
