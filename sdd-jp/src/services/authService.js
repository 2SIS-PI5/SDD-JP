import api from './api.js'

const CHAVE_SESSAO = 'hotel-sereno-sessao'

function textoParaHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

function gerarSalt() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return textoParaHex(bytes)
}

async function hashSenha(senha, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Este navegador não oferece suporte à criptografia necessária para a demonstração.')
  }
  const dados = new TextEncoder().encode(`${salt}:${senha}`)
  const digest = await crypto.subtle.digest('SHA-256', dados)
  return textoParaHex(digest)
}

function usuarioSeguro(usuario) {
  if (!usuario) return null
  const seguro = { ...usuario }
  delete seguro.senhaHash
  delete seguro.salt
  return seguro
}

export function lerSessao() {
  try {
    const bruto = window.localStorage.getItem(CHAVE_SESSAO)
    return bruto ? JSON.parse(bruto) : null
  } catch {
    window.localStorage.removeItem(CHAVE_SESSAO)
    return null
  }
}

export function salvarSessao(sessao) {
  window.localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
}

export function limparSessao() {
  window.localStorage.removeItem(CHAVE_SESSAO)
}

export async function registrar(dados) {
  const email = dados.email.trim().toLowerCase()
  const { data } = await api.get('/usuarios', { params: { email } })
  if (data.length > 0) {
    throw new Error('Já existe uma conta com este e-mail.')
  }

  const salt = gerarSalt()
  const senhaHash = await hashSenha(dados.senha, salt)
  const usuario = {
    id: crypto.randomUUID(),
    nome: dados.nome.trim(),
    email,
    cpf: dados.cpf,
    telefone: dados.telefone,
    dataNascimento: dados.dataNascimento,
    salt,
    senhaHash,
    criadoEm: new Date().toISOString(),
  }

  const { data: criado } = await api.post('/usuarios', usuario)
  return usuarioSeguro(criado)
}

export async function login({ email, senha }) {
  const { data } = await api.get('/usuarios', { params: { email: email.trim().toLowerCase() } })
  const usuario = data[0]
  if (!usuario) throw new Error('E-mail ou senha inválidos.')

  const hash = await hashSenha(senha, usuario.salt)
  if (hash !== usuario.senhaHash) throw new Error('E-mail ou senha inválidos.')

  const token = btoa(`${usuario.id}:${Date.now()}:${crypto.randomUUID()}`)
  return { usuario: usuarioSeguro(usuario), token }
}

export async function atualizarPerfil(id, dados) {
  const permitidos = {
    nome: dados.nome,
    telefone: dados.telefone,
    dataNascimento: dados.dataNascimento,
  }
  const { data } = await api.patch(`/usuarios/${id}`, permitidos)
  return usuarioSeguro(data)
}

export async function alterarSenha(id, senhaAtual, novaSenha) {
  const { data: usuario } = await api.get(`/usuarios/${id}`)
  const hashAtual = await hashSenha(senhaAtual, usuario.salt)
  if (hashAtual !== usuario.senhaHash) throw new Error('A senha atual não confere.')

  const salt = gerarSalt()
  const senhaHash = await hashSenha(novaSenha, salt)
  await api.patch(`/usuarios/${id}`, { salt, senhaHash })
}

export async function solicitarRecuperacao(email) {
  const { data } = await api.get('/usuarios', { params: { email: email.trim().toLowerCase() } })
  return {
    encontrado: data.length > 0,
    mensagem:
      'Se houver uma conta com este e-mail, um link de redefinição seria enviado. Nesta demonstração não há envio real de e-mail.',
  }
}

export async function redefinirSenhaPorEmail(email, novaSenha) {
  const { data } = await api.get('/usuarios', { params: { email: email.trim().toLowerCase() } })
  const usuario = data[0]
  if (!usuario) throw new Error('Não encontramos uma conta com este e-mail.')

  const salt = gerarSalt()
  const senhaHash = await hashSenha(novaSenha, salt)
  await api.patch(`/usuarios/${usuario.id}`, { salt, senhaHash })
  return { mensagem: 'Senha redefinida na simulação. Você já pode entrar com a nova senha.' }
}
