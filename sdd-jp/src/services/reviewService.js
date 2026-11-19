import api from './api.js'

export async function listarAvaliacoes() {
  const { data } = await api.get('/avaliacoes')
  return data.sort((a, b) => (b.criadaEm ?? '').localeCompare(a.criadaEm ?? ''))
}

export async function listarAvaliacoesDoQuarto(quartoId) {
  const { data } = await api.get('/avaliacoes', { params: { quartoId } })
  return data
}

export async function criarAvaliacao({ quartoId, usuarioId, hospede, nota, comentario }) {
  const { data } = await api.post('/avaliacoes', {
    quartoId,
    usuarioId,
    hospede,
    nota: Number(nota),
    comentario,
    criadaEm: new Date().toISOString(),
  })
  return data
}
