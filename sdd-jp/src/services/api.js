import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const sessao = window.localStorage.getItem('hotel-sereno-sessao')
  if (sessao) {
    try {
      const { token } = JSON.parse(sessao)
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch {
      window.localStorage.removeItem('hotel-sereno-sessao')
    }
  }
  return config
})

function mensagemDoErro(erro) {
  if (erro.code === 'ECONNABORTED') return 'A solicitação demorou demais. Tente novamente.'
  if (erro.code === 'ERR_NETWORK') return 'Não foi possível conectar à API. Verifique se o JSON Server está em execução.'
  const status = erro.response?.status
  if (status === 401 || status === 403) return 'Sua sessão expirou. Entre novamente.'
  if (status === 404) return 'O recurso solicitado não foi encontrado.'
  if (status >= 500) return 'O serviço de dados apresentou uma falha. Tente novamente em instantes.'
  return erro.response?.data?.message ?? 'Não foi possível concluir a operação.'
}

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const tratado = new Error(mensagemDoErro(erro))
    tratado.status = erro.response?.status
    tratado.original = erro
    return Promise.reject(tratado)
  },
)

export default api
