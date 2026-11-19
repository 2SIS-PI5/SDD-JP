const MAXIMO_DIGITOS = 11

export function apenasDigitos(valor = '') {
  return String(valor).replace(/\D/g, '').slice(0, MAXIMO_DIGITOS)
}

/**
 * Formata progressivamente um telefone brasileiro.
 * 10 dígitos: (11) 4002-8922 | 11 dígitos: (11) 90000-0000
 */
export function formatarTelefone(valor = '') {
  const digitos = apenasDigitos(valor)
  if (!digitos) return ''
  if (digitos.length <= 2) return `(${digitos}`

  const ddd = digitos.slice(0, 2)
  const numero = digitos.slice(2)

  if (numero.length <= 4) return `(${ddd}) ${numero}`
  if (numero.length <= 8) return `(${ddd}) ${numero.slice(0, 4)}-${numero.slice(4)}`
  return `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5, 9)}`
}

export function telefoneValido(valor = '') {
  const digitos = String(valor).replace(/\D/g, '')
  const ddd = Number(digitos.slice(0, 2))

  if (digitos.length !== 10 && digitos.length !== 11) return false
  if (!Number.isInteger(ddd) || ddd < 11 || ddd > 99) return false

  const primeiroDoNumero = digitos[2]
  if (digitos.length === 11) return primeiroDoNumero === '9'
  return ['2', '3', '4', '5'].includes(primeiroDoNumero)
}

export const MENSAGEM_TELEFONE = 'Informe um telefone com DDD: fixo (11) 4002-8922 ou celular (11) 90000-0000.'

export const ATRIBUTOS_TELEFONE = {
  type: 'tel',
  inputMode: 'tel',
  autoComplete: 'tel',
  placeholder: '(11) 90000-0000',
  maxLength: 15,
}
