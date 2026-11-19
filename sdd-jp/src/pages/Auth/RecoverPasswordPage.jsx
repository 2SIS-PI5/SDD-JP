import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import { solicitarRecuperacao } from '../../services/authService.js'
import styles from './AuthPages.module.css'

const esquema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.'),
})

function RecoverPasswordPage() {
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquema) })

  async function solicitar(dados) {
    setErro('')
    setMensagem('')
    setEnviando(true)
    try {
      const resultado = await solicitarRecuperacao(dados.email)
      setMensagem(resultado.mensagem)
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>Recuperação</p>
      <h1>Esqueceu sua senha?</h1>
      <p className={styles.subtitulo}>
        Informe o e-mail da conta. Nesta demonstração não há envio real de mensagens.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(solicitar)} noValidate>
        <FormField
          id="recuperar-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        {erro && <Alert tone="danger">{erro}</Alert>}
        {mensagem && (
          <Alert tone="success" title="Solicitação registrada">
            {mensagem} <Link to="/redefinir-senha">Redefinir senha agora</Link>
          </Alert>
        )}

        <Button type="submit" variant="primary" size="lg" full disabled={enviando}>
          {enviando ? 'Solicitando...' : 'Solicitar recuperação'}
        </Button>
      </form>

      <p className={styles.rodape}>
        Lembrou a senha? <Link to="/login">Voltar para o login</Link>
      </p>
    </div>
  )
}

export default RecoverPasswordPage
