import { describe, expect, it } from 'vitest'
import { FORCA_MINIMA, ROTULOS_FORCA, forcaDaSenha, senhaSuficiente } from './senha.js'

describe('força da senha', () => {
  it('classifica do muito fraca ao forte', () => {
    expect(ROTULOS_FORCA[forcaDaSenha('')]).toBe('Muito fraca')
    expect(ROTULOS_FORCA[forcaDaSenha('abcdefgh')]).toBe('Fraca')
    expect(ROTULOS_FORCA[forcaDaSenha('Abcdefgh')]).toBe('Razoável')
    expect(ROTULOS_FORCA[forcaDaSenha('Abcdefg1')]).toBe('Boa')
    expect(ROTULOS_FORCA[forcaDaSenha('Abcdefg1!xyz')]).toBe('Forte')
  })

  it('aceita a partir de razoável', () => {
    expect(FORCA_MINIMA).toBe(2)
    expect(senhaSuficiente('abcdefgh')).toBe(false)
    expect(senhaSuficiente('Abcdefgh')).toBe(true)
    expect(senhaSuficiente('Abcdefg1')).toBe(true)
    expect(senhaSuficiente('Abcdefg1!xyz')).toBe(true)
  })
})
