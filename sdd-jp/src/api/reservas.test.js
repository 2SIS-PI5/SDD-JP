import { afterEach, describe, expect, it, vi } from 'vitest'
import { criarReserva, listarQuartos, listarReservas } from './reservas.js'

const respostaJson = (dados, status = 200) =>
  new Response(JSON.stringify(dados), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('listarQuartos e listarReservas', () => {
  it('retornam os dados das coleções', async () => {
    const quartos = [{ id: 'quarto-101', nome: 'Suíte Jardim', capacidadeMaxima: 2 }]
    const fetchMock = vi.fn().mockResolvedValue(respostaJson(quartos))
    vi.stubGlobal('fetch', fetchMock)

    await expect(listarQuartos()).resolves.toEqual(quartos)
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/quartos$/)

    fetchMock.mockResolvedValue(respostaJson([]))
    await expect(listarReservas()).resolves.toEqual([])
    expect(fetchMock.mock.calls[1][0]).toMatch(/\/reservas$/)
  })

  it('rejeitam quando o HTTP não é 2xx', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson({}, 500)))
    await expect(listarQuartos()).rejects.toThrow()
    await expect(listarReservas()).rejects.toThrow()
  })

  it('rejeitam quando há falha de rede', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(listarQuartos()).rejects.toThrow()
  })
})

describe('criarReserva', () => {
  const reserva = {
    hospede: 'Ana',
    quartoId: 'quarto-101',
    dataInicio: '2026-12-10',
    dataFim: '2026-12-12',
    quantidadePessoas: 2,
  }

  it('envia POST em JSON com status SOLICITADA e retorna a reserva criada', async () => {
    const criada = { id: 'abc', ...reserva, status: 'SOLICITADA' }
    const fetchMock = vi.fn().mockResolvedValue(respostaJson(criada, 201))
    vi.stubGlobal('fetch', fetchMock)

    await expect(criarReserva(reserva)).resolves.toEqual(criada)

    const [url, opcoes] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/reservas$/)
    expect(opcoes.method).toBe('POST')
    expect(opcoes.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(opcoes.body)).toEqual({ ...reserva, status: 'SOLICITADA' })
  })

  it('rejeita quando o HTTP não é 2xx', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson({}, 500)))
    await expect(criarReserva(reserva)).rejects.toThrow()
  })

  it('rejeita quando há falha de rede', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(criarReserva(reserva)).rejects.toThrow()
  })
})
