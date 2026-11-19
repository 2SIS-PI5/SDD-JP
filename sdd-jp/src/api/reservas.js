const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function requisitar(caminho, opcoes) {
  const resposta = await fetch(`${API_URL}${caminho}`, opcoes)
  if (!resposta.ok) {
    throw new Error(`Falha HTTP ${resposta.status} em ${caminho}`)
  }
  return resposta.json()
}

export function listarQuartos() {
  return requisitar('/quartos')
}

export function listarReservas() {
  return requisitar('/reservas')
}

export function criarReserva(reserva) {
  return requisitar('/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...reserva, status: 'SOLICITADA' }),
  })
}
