import { describe, expect, it } from 'vitest'
import {
  apenasDigitos,
  formatarTelefone,
  telefoneValido,
} from './telefone.js'

describe('máscara de telefone', () => {
  it('formata celular e telefone fixo progressivamente', () => {
    expect(formatarTelefone('')).toBe('')
    expect(formatarTelefone('1')).toBe('(1')
    expect(formatarTelefone('11')).toBe('(11')
    expect(formatarTelefone('119')).toBe('(11) 9')
    expect(formatarTelefone('119000')).toBe('(11) 9000')
    expect(formatarTelefone('1190000')).toBe('(11) 9000-0')
    expect(formatarTelefone('11900000000')).toBe('(11) 90000-0000')
    expect(formatarTelefone('1140028922')).toBe('(11) 4002-8922')
  })

  it('ignora caracteres não numéricos e limita a 11 dígitos', () => {
    expect(formatarTelefone('(11) 90000-0000')).toBe('(11) 90000-0000')
    expect(apenasDigitos('(11) 90000-0000')).toBe('11900000000')
    expect(apenasDigitos('119000000009999')).toBe('11900000000')
  })
})

describe('validação de telefone brasileiro', () => {
  it('aceita celular com 9 e fixo com 2 a 5', () => {
    expect(telefoneValido('(11) 90000-0000')).toBe(true)
    expect(telefoneValido('(11) 4002-8922')).toBe(true)
    expect(telefoneValido('(21) 3333-4444')).toBe(true)
  })

  it('rejeita DDD inválido, quantidade errada e nono dígito ausente no celular', () => {
    expect(telefoneValido('')).toBe(false)
    expect(telefoneValido('(01) 90000-0000')).toBe(false)
    expect(telefoneValido('(11) 9000-0000')).toBe(false)
    expect(telefoneValido('(11) 80000-0000')).toBe(false)
    expect(telefoneValido('(11) 90000-00000')).toBe(false)
  })
})
