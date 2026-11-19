import { describe, expect, it, vi, beforeEach } from 'vitest'
import api from './api.js'

vi.mock('./api.js', () => ({
  default: { get: vi.fn() },
}))

const { sobrepoePeriodo, quartoDisponivel, buscarDisponiveis, verificarDisponibilidade } = await import(
  './availabilityService.js'
)

const quartos = [
  {
    id: 'q1',
    nome: 'Suíte Jardim',
    categoria: 'Suíte',
    capacidadeMaxima: 2,
    precoDiaria: 400,
    avaliacao: 4.8,
    totalAvaliacoes: 10,
    comodidades: ['Wi-Fi'],
    imagens: ['a.jpg'],
    destaque: true,
  },
  {
    id: 'q2',
    nome: 'Chalé Família',
    categoria: 'Chalé',
    capacidadeMaxima: 5,
    precoDiaria: 800,
    avaliacao: 4.6,
    totalAvaliacoes: 4,
    comodidades: ['Wi-Fi', 'Cozinha'],
    imagens: ['b.jpg'],
    destaque: false,
  },
]

const reservas = [
  { id: 'r1', quartoId: 'q1', dataInicio: '2026-12-10', dataFim: '2026-12-15', status: 'CONFIRMADA' },
  { id: 'r2', quartoId: 'q2', dataInicio: '2026-12-10', dataFim: '2026-12-15', status: 'CANCELADA' },
]

function mockApi() {
  api.get.mockImplementation((url) => {
    if (url === '/quartos') return Promise.resolve({ data: quartos })
    if (url === '/reservas') return Promise.resolve({ data: reservas })
    return Promise.reject(new Error('rota inesperada'))
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockApi()
})

describe('sobrepoePeriodo', () => {
  it('detecta sobreposição parcial e total', () => {
    const reserva = { dataInicio: '2026-12-10', dataFim: '2026-12-15', status: 'CONFIRMADA' }
    expect(sobrepoePeriodo(reserva, '2026-12-09', '2026-12-11')).toBe(true)
    expect(sobrepoePeriodo(reserva, '2026-12-14', '2026-12-20')).toBe(true)
    expect(sobrepoePeriodo(reserva, '2026-12-10', '2026-12-15')).toBe(true)
  })

  it('não considera períodos que apenas encostam', () => {
    const reserva = { dataInicio: '2026-12-10', dataFim: '2026-12-15', status: 'CONFIRMADA' }
    expect(sobrepoePeriodo(reserva, '2026-12-15', '2026-12-18')).toBe(false)
    expect(sobrepoePeriodo(reserva, '2026-12-07', '2026-12-10')).toBe(false)
  })

  it('ignora reservas canceladas', () => {
    const reserva = { dataInicio: '2026-12-10', dataFim: '2026-12-15', status: 'CANCELADA' }
    expect(sobrepoePeriodo(reserva, '2026-12-10', '2026-12-15')).toBe(false)
  })
})

describe('quartoDisponivel', () => {
  it('retorna falso quando há conflito confirmado no quarto', () => {
    expect(quartoDisponivel(quartos[0], reservas, '2026-12-12', '2026-12-14')).toBe(false)
  })

  it('retorna verdadeiro quando o conflito está cancelado', () => {
    expect(quartoDisponivel(quartos[1], reservas, '2026-12-12', '2026-12-14')).toBe(true)
  })
})

describe('buscarDisponiveis', () => {
  it('filtra por capacidade e por conflito de reservas', async () => {
    const resultado = await buscarDisponiveis({
      inicio: '2026-12-12',
      fim: '2026-12-14',
      adultos: 2,
      criancas: 0,
      quartos: 1,
    })
    expect(resultado.map((quarto) => quarto.id)).toEqual(['q2'])
    expect(resultado[0].disponivel).toBe(true)
  })

  it('considera a quantidade de quartos na capacidade necessária', async () => {
    const resultado = await buscarDisponiveis({
      inicio: '2026-12-20',
      fim: '2026-12-22',
      adultos: 4,
      criancas: 4,
      quartos: 2,
    })
    expect(resultado.map((quarto) => quarto.id)).toEqual(['q2'])
  })

  it('retorna lista vazia quando nenhuma acomodação atende', async () => {
    const resultado = await buscarDisponiveis({
      inicio: '2026-12-10',
      fim: '2026-12-15',
      adultos: 6,
      criancas: 0,
      quartos: 1,
    })
    expect(resultado).toEqual([])
  })
})

describe('verificarDisponibilidade', () => {
  it('responde falso para quarto ocupado e verdadeiro para período livre', async () => {
    await expect(verificarDisponibilidade('q1', '2026-12-12', '2026-12-14')).resolves.toBe(false)
    await expect(verificarDisponibilidade('q1', '2026-12-20', '2026-12-22')).resolves.toBe(true)
  })
})
