import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import { redefinirSenhaPorEmail } from '../../services/authService.js'
import { MENSAGEM_SENHA, senhaSuficiente } from '../../utils/senha.js'
import styles from './AuthPages.module.css'

const esquema = z
  .object({
    email: z.string().trim().email('Informe um e-mail válido.'),
    novaSenha: z.string().refine(senhaSuficiente, MENSAGEM_SENHA),
    confirmarSenha: z.string(),
  })
  .refine((dados) => dados.novaSenha === dados.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas não conferem.',
  })

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquema) })

  async function redefinir(dados) {
    setErro('')
    setMensagem('')
    setEnviando(true)
    try {
      const resultado = await redefinirSenhaPorEmail(dados.email, dados.novaSenha)
      setMensagem(resultado.mensagem)
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>Nova senha</p>
      <h1>Redefinir senha</h1>
      <p className={styles.subtitulo}>
        Simulação acadêmica: informar o e-mail cadastrado é suficiente para redefinir a senha local.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(redefinir)} noValidate>
        <FormField
          id="redefinir-email"
          label="E-mail da conta"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          id="redefinir-senha"
          label="Nova senha"
          type="password"
          autoComplete="new-password"
          error={errors.novaSenha?.message}
          {...register('novaSenha')}
        />
        <FormField
          id="redefinir-confirmar"
          label="Confirmar nova senha"
          type="password"
          autoComplete="new-password"
          error={errors.confirmarSenha?.message}
          {...register('confirmarSenha')}
        />

        {erro && <Alert tone="danger">{erro}</Alert>}
        {mensagem && <Alert tone="success">{mensagem}</Alert>}

        <Button type="submit" variant="primary" size="lg" full disabled={enviando}>
          {enviando ? 'Redefinindo...' : 'Redefinir senha'}
        </Button>

        {mensagem && (
          <Button type="button" variant="ghost" size="md" full onClick={() => navigate('/login')}>
            Ir para o login
          </Button>
        )}
      </form>
    </div>
  )
}

export default ResetPasswordPage
