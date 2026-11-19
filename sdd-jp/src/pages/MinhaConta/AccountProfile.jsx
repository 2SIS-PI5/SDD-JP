import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { alterarSenha } from '../../services/authService.js'
import { formatarData } from '../../utils/date.js'
import styles from './AccountPages.module.css'

const esquemaPerfil = z.object({
  nome: z.string().trim().min(3, 'Informe o nome completo.'),
  telefone: z.string().trim().min(10, 'Informe um telefone com DDD.'),
  dataNascimento: z.string().min(1, 'Informe a data de nascimento.'),
})

const esquemaSenha = z
  .object({
    senhaAtual: z.string().min(1, 'Informe a senha atual.'),
    novaSenha: z.string().min(8, 'Use ao menos 8 caracteres.'),
    confirmar: z.string(),
  })
  .refine((dados) => dados.novaSenha === dados.confirmar, {
    path: ['confirmar'],
    message: 'As senhas não conferem.',
  })

function AccountProfile() {
  const { usuario, atualizarUsuario } = useAuth()
  const [feedback, setFeedback] = useState(null)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [senhaFeedback, setSenhaFeedback] = useState('')
  const [senhaErro, setSenhaErro] = useState('')

  const perfil = useForm({
    resolver: zodResolver(esquemaPerfil),
    defaultValues: {
      nome: usuario.nome,
      telefone: usuario.telefone ?? '',
      dataNascimento: usuario.dataNascimento ?? '',
    },
  })

  const senha = useForm({ resolver: zodResolver(esquemaSenha) })

  async function salvarPerfil(dados) {
    setErro('')
    setFeedback(null)
    setSalvando(true)
    try {
      await atualizarUsuario(dados)
      setFeedback('Dados atualizados com sucesso.')
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setSalvando(false)
    }
  }

  async function salvarSenha(dados) {
    setSenhaErro('')
    setSenhaFeedback('')
    try {
      await alterarSenha(usuario.id, dados.senhaAtual, dados.novaSenha)
      setSenhaFeedback('Senha alterada na simulação.')
      senha.reset()
    } catch (falha) {
      setSenhaErro(falha.message)
    }
  }

  return (
    <div className={styles.stack}>
      <header className={styles.topo}>
        <div>
          <p className={styles.eyebrow}>Meu perfil</p>
          <h1>Seus dados</h1>
          <p className={styles.subtitulo}>Atualize suas informações de contato e acesso.</p>
        </div>
      </header>

      <div className={styles.detalheGrid}>
        <section className={styles.bloco}>
          <h2>Dados pessoais</h2>
          <form className={styles.form} onSubmit={perfil.handleSubmit(salvarPerfil)} noValidate>
            <FormField
              id="perfil-nome"
              label="Nome completo"
              error={perfil.formState.errors.nome?.message}
              {...perfil.register('nome')}
            />
            <FormField
              id="perfil-telefone"
              label="Telefone"
              error={perfil.formState.errors.telefone?.message}
              {...perfil.register('telefone')}
            />
            <FormField
              id="perfil-nascimento"
              label="Data de nascimento"
              type="date"
              error={perfil.formState.errors.dataNascimento?.message}
              {...perfil.register('dataNascimento')}
            />
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <p><strong>CPF:</strong> {usuario.cpf}</p>
            <p><strong>Cliente desde:</strong> {formatarData(usuario.criadoEm?.slice(0, 10))}</p>
            {feedback && <Alert tone="success">{feedback}</Alert>}
            {erro && <Alert tone="danger">{erro}</Alert>}
            <Button type="submit" variant="primary" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </section>

        <section className={styles.bloco}>
          <h2>Alterar senha</h2>
          <form className={styles.form} onSubmit={senha.handleSubmit(salvarSenha)} noValidate>
            <FormField
              id="senha-atual"
              label="Senha atual"
              type="password"
              autoComplete="current-password"
              error={senha.formState.errors.senhaAtual?.message}
              {...senha.register('senhaAtual')}
            />
            <FormField
              id="senha-nova"
              label="Nova senha"
              type="password"
              autoComplete="new-password"
              error={senha.formState.errors.novaSenha?.message}
              {...senha.register('novaSenha')}
            />
            <FormField
              id="senha-confirmar"
              label="Confirmar nova senha"
              type="password"
              autoComplete="new-password"
              error={senha.formState.errors.confirmar?.message}
              {...senha.register('confirmar')}
            />
            {senhaFeedback && <Alert tone="success">{senhaFeedback}</Alert>}
            {senhaErro && <Alert tone="danger">{senhaErro}</Alert>}
            <Button type="submit" variant="primary">
              Alterar senha
            </Button>
          </form>
        </section>
      </div>

      <Alert tone="info" title="Limitação da demonstração">
        A autenticação é simulada e armazenada no JSON Server com hash + salt. Não use uma senha real.
      </Alert>
    </div>
  )
}

export default AccountProfile
