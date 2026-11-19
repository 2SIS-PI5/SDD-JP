import api from './api.js'

export async function enviarContato({ nome, email, assunto, mensagem }) {
  const { data } = await api.post('/contatos', {
    nome,
    email,
    assunto,
    mensagem,
    criadoEm: new Date().toISOString(),
  })
  return data
}
