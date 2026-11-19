import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.jsx'
import { AuthProvider } from '../contexts/AuthContext.jsx'

function renderRota(rota) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('rotas públicas', () => {
  it('renderiza a página Sobre com o layout público', () => {
    renderRota('/sobre')
    expect(screen.getByRole('heading', { level: 1, name: /uma casa aberta ao tempo/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /hotel sereno — página inicial/i })).toBeInTheDocument()
  })

  it('renderiza a página 404 para caminhos desconhecidos', () => {
    renderRota('/caminho-inexistente')
    expect(screen.getByRole('heading', { level: 1, name: /este caminho não existe/i })).toBeInTheDocument()
  })

  it('renderiza o formulário de login no layout de autenticação', () => {
    renderRota('/login')
    expect(screen.getByRole('heading', { level: 1, name: /bem-vindo de volta/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
  })

  it('redireciona rota protegida para o login', () => {
    renderRota('/minha-conta')
    expect(screen.getByRole('heading', { level: 1, name: /bem-vindo de volta/i })).toBeInTheDocument()
  })
})
