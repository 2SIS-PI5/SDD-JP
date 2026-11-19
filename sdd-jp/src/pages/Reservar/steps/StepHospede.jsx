import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../../../components/atoms/Button/Button.jsx'
import FormField from '../../../components/atoms/FormField/FormField.jsx'
import Alert from '../../../components/atoms/Alert/Alert.jsx'
import styles from './ReserveSteps.module.css'

const esquema = z.object({
  nome: z.string().trim().min(3, 'Informe o nome completo.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  telefone: z.string().trim().min(10, 'Informe um telefone com DDD.'),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'Informe um CPF válido (somente números ou com pontuação).'),
})

function StepHospede({ hospede, onContinuar, erro }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquema), defaultValues: hospede })

  return (
    <form className={styles.step} onSubmit={handleSubmit(onContinuar)} noValidate>
      <h2>Dados do hóspede</h2>
      <p className={styles.intro}>
        Esses dados serão usados apenas para esta solicitação demonstrativa.
      </p>

      <div className={styles.grid2}>
        <FormField
          id="hospede-nome"
          label="Nome completo"
          autoComplete="name"
          error={errors.nome?.message}
          {...register('nome')}
        />
        <FormField
          id="hospede-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          id="hospede-telefone"
          label="Telefone"
          autoComplete="tel"
          placeholder="(11) 90000-0000"
          error={errors.telefone?.message}
          {...register('telefone')}
        />
        <FormField
          id="hospede-cpf"
          label="CPF"
          inputMode="numeric"
          placeholder="000.000.000-00"
          error={errors.cpf?.message}
          {...register('cpf')}
        />
      </div>

      {erro && <Alert tone="danger">{erro}</Alert>}

      <div className={styles.acoes}>
        <Button type="submit" variant="primary" size="lg">
          Continuar para revisão
        </Button>
      </div>
    </form>
  )
}

export default StepHospede
