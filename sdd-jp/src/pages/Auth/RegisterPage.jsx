import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './AuthPages.module.css'

const esquema = z
  .object({
    nome: z.string().trim().min(3, 'Informe o nome completo.'),
    cpf: z.string().trim().regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'Informe um CPF válido.'),
    email: z.string().trim().email('Informe um e-mail válido.'),
    telefone: z.string().trim().min(10, 'Informe um telefone com DDD.'),
    dataNascimento: z.string().min(1, 'Informe a data de nascimento.'),
    senha: z
      .string()
      .min(8, 'Use ao menos 8 caracteres.')
      .regex(/[A-Za-z]/, 'Inclua ao menos uma letra.')
      .regex(/\d/, 'Inclua ao menos um número.'),
    confirmarSenha: z.string(),
    termos: z.literal(true, { error: 'É necessário aceitar os termos de uso.' }),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas não conferem.',
  })

function forcaDaSenha(senha) {
  let pontos = 0
  if (senha.length >= 8) pontos += 1
  if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos += 1
  if (/\d/.test(senha)) pontos += 1
  if (/[^A-Za-z0-9]/.test(senha)) pontos += 1
  if (senha.length >= 12) pontos = Math.min(4, pontos + 1)
  return pontos
}

function RegisterPage() {
  const { cadastrar } = useAuth()
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquema),
    defaultValues: {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      senha: '',
      confirmarSenha: '',
      termos: false,
    },
  })

  const senha = watch('senha')
  const pontos = useMemo(() => forcaDaSenha(senha ?? ''), [senha])
  const rotuloForca = ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'][pontos]

  async function criarConta(dados) {
    setErro('')
    setEnviando(true)
    try {
      await cadastrar(dados)
      navigate('/minha-conta', { replace: true })
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>Nova conta</p>
      <h1>Crie sua conta</h1>
      <p className={styles.subtitulo}>Leva menos de um minuto. Seus dados ficam apenas no mock local.</p>

      <form className={styles.form} onSubmit={handleSubmit(criarConta)} noValidate>
        <FormField
          id="cadastro-nome"
          label="Nome completo"
          autoComplete="name"
          error={errors.nome?.message}
          {...register('nome')}
        />

        <div className={styles.duasColunas}>
          <FormField
            id="cadastro-cpf"
            label="CPF"
            inputMode="numeric"
            placeholder="000.000.000-00"
            error={errors.cpf?.message}
            {...register('cpf')}
          />
          <FormField
            id="cadastro-nascimento"
            label="Data de nascimento"
            type="date"
            error={errors.dataNascimento?.message}
            {...register('dataNascimento')}
          />
        </div>

        <FormField
          id="cadastro-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <FormField
          id="cadastro-telefone"
          label="Telefone"
          autoComplete="tel"
          placeholder="(11) 90000-0000"
          error={errors.telefone?.message}
          {...register('telefone')}
        />

        <div className={styles.senha}>
          <FormField
            id="cadastro-senha"
            label="Senha"
            type={mostrarSenha ? 'text' : 'password'}
            autoComplete="new-password"
            error={errors.senha?.message}
            {...register('senha')}
          />
          <button type="button" className={styles.mostrar} onClick={() => setMostrarSenha((valor) => !valor)}>
            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {senha && (
          <div className={styles.forca} aria-live="polite">
            <div className={styles.barras}>
              {[0, 1, 2, 3].map((indice) => (
                <span
                  key={indice}
                  className={indice < pontos ? (pontos <= 1 ? styles.fraca : pontos <= 2 ? styles.media : styles.forte) : ''}
                />
              ))}
            </div>
            <p>Força da senha: {rotuloForca}</p>
          </div>
        )}

        <FormField
          id="cadastro-confirmar"
          label="Confirmar senha"
          type={mostrarSenha ? 'text' : 'password'}
          autoComplete="new-password"
          error={errors.confirmarSenha?.message}
          {...register('confirmarSenha')}
        />

        <label className={styles.termos}>
          <input type="checkbox" {...register('termos')} />
          <span>Li e aceito os termos de uso e a política de privacidade desta demonstração.</span>
        </label>
        {errors.termos && <p className={styles.forca} role="alert"><span>⚠</span> {errors.termos.message}</p>}

        {erro && <Alert tone="danger">{erro}</Alert>}

        <Button type="submit" variant="primary" size="lg" full disabled={enviando}>
          {enviando ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>

      <p className={styles.rodape}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}

export default RegisterPage
