import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import { enviarContato } from '../../services/contactService.js'
import styles from '../institutional.module.css'

const esquema = z.object({
  nome: z.string().trim().min(3, 'Informe seu nome.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  assunto: z.string().min(1, 'Selecione um assunto.'),
  mensagem: z.string().trim().min(10, 'Escreva ao menos 10 caracteres.'),
})

function ContactPage() {
  const [feedback, setFeedback] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquema),
    defaultValues: { nome: '', email: '', assunto: 'reservas', mensagem: '' },
  })

  async function enviar(dados) {
    setErro('')
    setFeedback('')
    setEnviando(true)
    try {
      await enviarContato(dados)
      setFeedback('Mensagem registrada. Nossa equipe responderia em até 1 dia útil.')
      reset()
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.hero}>
        <span className="eyebrow">Contato</span>
        <h1>Estamos à disposição</h1>
        <p>Fale com a recepção, tire dúvidas sobre reservas ou conte como podemos tornar sua estadia melhor.</p>
      </header>

      <div className={styles.contatoGrid}>
        <section className={styles.info}>
          <div>
            <h2>Recepção</h2>
            <p>Av. das Palmeiras, 1200</p>
            <p>Jardim Sereno — São Paulo, SP</p>
          </div>
          <div>
            <h2>Telefone e e-mail</h2>
            <p><a href="tel:+551140028922">(11) 4002-8922</a></p>
            <p><a href="mailto:reservas@hotelsereno.com.br">reservas@hotelsereno.com.br</a></p>
          </div>
          <div>
            <h2>Horários</h2>
            <p>Recepção: 24 horas</p>
            <p>Reservas: 8h às 20h, todos os dias</p>
          </div>
          <div>
            <h2>Canais digitais</h2>
            <p><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></p>
            <p><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></p>
          </div>
          <Alert tone="info" title="Demonstração acadêmica">
            O formulário registra a mensagem no JSON Server e não envia e-mail real.
          </Alert>
        </section>

        <section className={styles.formCard}>
          <h2>Envie uma mensagem</h2>
          <form className={styles.form} onSubmit={handleSubmit(enviar)} noValidate>
            <FormField id="contato-nome" label="Nome" error={errors.nome?.message} {...register('nome')} />
            <FormField id="contato-email" label="E-mail" type="email" error={errors.email?.message} {...register('email')} />
            <FormField id="contato-assunto" label="Assunto" as="select" error={errors.assunto?.message} {...register('assunto')}>
              <option value="reservas">Reservas</option>
              <option value="hospedagem">Hospedagem</option>
              <option value="eventos">Eventos</option>
              <option value="outros">Outros</option>
            </FormField>
            <FormField
              id="contato-mensagem"
              label="Mensagem"
              as="textarea"
              rows={5}
              error={errors.mensagem?.message}
              {...register('mensagem')}
            />
            {feedback && <Alert tone="success">{feedback}</Alert>}
            {erro && <Alert tone="danger">{erro}</Alert>}
            <Button type="submit" variant="primary" size="lg" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar mensagem'}
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
