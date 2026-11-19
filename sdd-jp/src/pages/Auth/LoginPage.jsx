import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './AuthPages.module.css'

const esquema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.'),
  senha: z.string().min(1, 'Informe a senha.'),
})

function LoginPage() {
  const { entrar } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquema), defaultValues: { email: '', senha: '' } })

  async function acessar(dados) {
    setErro('')
    setEnviando(true)
    try {
      await entrar(dados)
      navigate(params.get('redirect') ?? '/minha-conta', { replace: true })
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>Área do cliente</p>
      <h1>Bem-vindo de volta</h1>
      <p className={styles.subtitulo}>Entre para consultar suas reservas e finalizar novas solicitações.</p>

      <form className={styles.form} onSubmit={handleSubmit(acessar)} noValidate>
        <FormField
          id="login-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className={styles.senha}>
          <FormField
            id="login-senha"
            label="Senha"
            type={mostrarSenha ? 'text' : 'password'}
            autoComplete="current-password"
            error={errors.senha?.message}
            {...register('senha')}
          />
          <button type="button" className={styles.mostrar} onClick={() => setMostrarSenha((valor) => !valor)}>
            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <div className={styles.links}>
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
        </div>

        {erro && <Alert tone="danger">{erro}</Alert>}

        <Button type="submit" variant="primary" size="lg" full disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <p className={styles.rodape}>
        Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
      </p>
      <p className={styles.nota}>
        Autenticação simulada para fins acadêmicos. Não use dados pessoais reais.
      </p>
    </div>
  )
}

export default LoginPage
