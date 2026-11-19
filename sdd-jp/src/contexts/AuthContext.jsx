import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'
import * as authService from '../services/authService.js'

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(() => authService.lerSessao())

  const entrar = useCallback(async (credenciais) => {
    const novaSessao = await authService.login(credenciais)
    authService.salvarSessao(novaSessao)
    setSessao(novaSessao)
    return novaSessao
  }, [])

  const cadastrar = useCallback(async (dados) => {
    const usuario = await authService.registrar(dados)
    const novaSessao = { usuario, token: btoa(`${usuario.id}:${Date.now()}`) }
    authService.salvarSessao(novaSessao)
    setSessao(novaSessao)
    return usuario
  }, [])

  const sair = useCallback(() => {
    authService.limparSessao()
    setSessao(null)
  }, [])

  const atualizarUsuario = useCallback(
    async (dados) => {
      const usuario = await authService.atualizarPerfil(sessao.usuario.id, dados)
      const novaSessao = { ...sessao, usuario }
      authService.salvarSessao(novaSessao)
      setSessao(novaSessao)
      return usuario
    },
    [sessao],
  )

  const valor = useMemo(
    () => ({
      usuario: sessao?.usuario ?? null,
      token: sessao?.token ?? null,
      autenticado: Boolean(sessao?.usuario),
      entrar,
      cadastrar,
      sair,
      atualizarUsuario,
    }),
    [sessao, entrar, cadastrar, sair, atualizarUsuario],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
