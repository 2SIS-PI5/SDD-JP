import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../../../components/atoms/Button/Button.jsx'
import FormField from '../../../components/atoms/FormField/FormField.jsx'
import Alert from '../../../components/atoms/Alert/Alert.jsx'
import {
  ATRIBUTOS_TELEFONE,
  MENSAGEM_TELEFONE,
  formatarTelefone,
  telefoneValido,
} from '../../../utils/telefone.js'
import styles from './ReserveSteps.module.css'

const esquema = z.object({
  nome: z.string().trim().min(3, 'Informe o nome completo.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  telefone: z.string().refine(telefoneValido, MENSAGEM_TELEFONE),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'Informe um CPF válido (somente números ou com pontuação).'),
})

function StepHospede({ hospede, onContinuar, erro }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquema),
    defaultValues: { ...hospede, telefone: formatarTelefone(hospede.telefone ?? '') },
  })

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
        <Controller
          control={control}
          name="telefone"
          render={({ field }) => (
            <FormField
              id="hospede-telefone"
              label="Telefone"
              {...ATRIBUTOS_TELEFONE}
              value={field.value}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.telefone?.message}
              onChange={(evento) => field.onChange(formatarTelefone(evento.target.value))}
            />
          )}
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
