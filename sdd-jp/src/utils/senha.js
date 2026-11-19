export const ROTULOS_FORCA = ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte']

/** Índice mínimo aceito: 2 = "Razoável". */
export const FORCA_MINIMA = 2

export function forcaDaSenha(senha = '') {
  let pontos = 0
  if (senha.length >= 8) pontos += 1
  if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos += 1
  if (/\d/.test(senha)) pontos += 1
  if (/[^A-Za-z0-9]/.test(senha)) pontos += 1
  if (senha.length >= 12) pontos = Math.min(4, pontos + 1)
  return pontos
}

/** Aceita qualquer senha cuja força seja Razoável, Boa ou Forte. */
export function senhaSuficiente(senha = '') {
  return forcaDaSenha(senha) >= FORCA_MINIMA
}

export const MENSAGEM_SENHA =
  'Use uma senha com força Razoável ou superior (mínimo de 8 caracteres).'
