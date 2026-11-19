import api from './api.js'

function normalizar(quarto) {
  return {
    ...quarto,
    capacidadeMaxima: Number(quarto.capacidadeMaxima) || 1,
    precoDiaria: Number(quarto.precoDiaria) || 0,
    avaliacao: Number(quarto.avaliacao) || 0,
    totalAvaliacoes: Number(quarto.totalAvaliacoes) || 0,
    comodidades: quarto.comodidades ?? [],
    imagens: quarto.imagens?.length
      ? quarto.imagens
      : ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80'],
  }
}

export async function listarAcomodacoes() {
  const { data } = await api.get('/quartos')
  return data.map(normalizar)
}

export async function obterAcomodacao(id) {
  const { data } = await api.get(`/quartos/${id}`)
  return normalizar(data)
}

export async function listarDestaques() {
  const acomodacoes = await listarAcomodacoes()
  return acomodacoes.filter((quarto) => quarto.destaque).slice(0, 3)
}

export function filtrarAcomodacoes(acomodacoes, filtros) {
  const {
    categorias = [],
    capacidade = 0,
    precoMaximo = 0,
    comodidades = [],
    ordenacao = 'destaque',
    busca = '',
  } = filtros

  const termo = busca.trim().toLowerCase()

  const filtradas = acomodacoes.filter((quarto) => {
    if (categorias.length && !categorias.includes(quarto.categoria)) return false
    if (capacidade && quarto.capacidadeMaxima < capacidade) return false
    if (precoMaximo && quarto.precoDiaria > precoMaximo) return false
    if (comodidades.length && !comodidades.every((item) => quarto.comodidades.includes(item))) return false
    if (termo && !`${quarto.nome} ${quarto.descricao}`.toLowerCase().includes(termo)) return false
    return true
  })

  return [...filtradas].sort((a, b) => {
    if (ordenacao === 'menor-preco') return a.precoDiaria - b.precoDiaria
    if (ordenacao === 'maior-preco') return b.precoDiaria - a.precoDiaria
    if (ordenacao === 'avaliacao') return b.avaliacao - a.avaliacao
    return Number(b.destaque) - Number(a.destaque) || b.avaliacao - a.avaliacao
  })
}
