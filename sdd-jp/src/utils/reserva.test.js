import { describe, expect, it } from 'vitest'
import { calcularTotais, gerarCodigoReserva } from './reserva.js'
import { adicionarDias, calcularDiarias, formatarMoeda, intervaloValido, paraISO } from './date.js'

describe('utilitários de data', () => {
  it('converte entre Date e ISO sem deslocar o fuso', () => {
    expect(paraISO(new Date(2026, 11, 5))).toBe('2026-12-05')
    expect(calcularDiarias('2026-12-05', '2026-12-08')).toBe(3)
    expect(adicionarDias('2026-12-05', 3)).toBe('2026-12-08')
  })

  it('rejeita intervalos inválidos', () => {
    expect(intervaloValido('2026-12-05', '2026-12-05')).toBe(false)
    expect(intervaloValido('2026-12-08', '2026-12-05')).toBe(false)
    expect(calcularDiarias('2026-12-08', '2026-12-05')).toBe(0)
  })

  it('formata valores em real', () => {
    expect(formatarMoeda(1234.5)).toMatch(/1\.234,50/)
  })
})

describe('utilitários de reserva', () => {
  it('calcula subtotal, taxas e total com base nas diárias e quartos', () => {
    const totais = calcularTotais({ precoDiaria: 400, diarias: 2, quantidadeQuartos: 2 })
    expect(totais.subtotal).toBe(1600)
    expect(totais.taxas).toBe(160)
    expect(totais.total).toBe(1760)
  })

  it('gera código de reserva legível e único', () => {
    const codigo = gerarCodigoReserva(new Date(2026, 10, 19))
    expect(codigo).toMatch(/^HSP-20261119-\d{4}$/)
    expect(codigo).not.toBe(gerarCodigoReserva(new Date(2026, 10, 19)))
  })
})
