import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import EmptyState from '../../components/atoms/EmptyState/EmptyState.jsx'
import FormField from '../../components/atoms/FormField/FormField.jsx'
import Rating from '../../components/atoms/Rating/Rating.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useMinhasReservas } from '../../hooks/useMinhasReservas.js'
import { criarAvaliacao, listarAvaliacoes } from '../../services/reviewService.js'
import { formatarData, hojeISO } from '../../utils/date.js'
import styles from './ReviewsPage.module.css'

const esquema = z.object({
  nota: z.coerce.number().int().min(1, 'Escolha uma nota.').max(5),
  comentario: z.string().trim().min(10, 'Escreva ao menos 10 caracteres.'),
})

function ReviewsPage() {
  const { autenticado, usuario } = useAuth()
  const { reservas, quartosPorId } = useMinhasReservas(usuario?.id)
  const [avaliacoes, setAvaliacoes] = useState([])
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const concluidas = useMemo(
    () => reservas.filter((reserva) => reserva.dataFim < hojeISO() && reserva.status !== 'CANCELADA'),
    [reservas],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquema), defaultValues: { nota: 5, comentario: '' } })

  useEffect(() => {
    let ativo = true
    listarAvaliacoes()
      .then((dados) => {
        if (!ativo) return
        setAvaliacoes(dados)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [tentativa])

  const tentarNovamente = useCallback(() => {
    setStatus('carregando')
    setTentativa((valor) => valor + 1)
  }, [])

  const media = avaliacoes.length
    ? avaliacoes.reduce((soma, avaliacao) => soma + Number(avaliacao.nota), 0) / avaliacoes.length
    : 0

  async function avaliar(dados, evento) {
    const form = evento.target
    const quartoId = new FormData(form).get('reserva')
    const reserva = concluidas.find((item) => item.id === quartoId)
    if (!reserva) {
      setErro('Selecione uma hospedagem concluída.')
      return
    }
    setErro('')
    setFeedback('')
    setEnviando(true)
    try {
      const criada = await criarAvaliacao({
        quartoId: reserva.quartoId,
        usuarioId: usuario.id,
        hospede: usuario.nome,
        nota: dados.nota,
        comentario: dados.comentario,
      })
      setAvaliacoes((atuais) => [criada, ...atuais])
      setFeedback('Avaliação registrada. Obrigado por compartilhar sua experiência.')
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
        <span className="eyebrow">Avaliações</span>
        <h1>A voz de quem já se hospedou</h1>
        <div className={styles.media}>
          <strong>{media.toFixed(1)}</strong>
          <Rating nota={media} compact />
          <span>{avaliacoes.length} {avaliacoes.length === 1 ? 'avaliação' : 'avaliações'}</span>
        </div>
      </header>

      {status === 'carregando' && <Spinner label="Carregando avaliações..." />}

      {status === 'erro' && (
        <Alert
          tone="danger"
          title="Não foi possível carregar as avaliações"
          action={
            <Button type="button" variant="ghost" size="sm" onClick={tentarNovamente}>
              Tentar novamente
            </Button>
          }
        />
      )}

      {status === 'pronto' && (
        <div className={styles.grid}>
          <div className={styles.lista}>
            {avaliacoes.length === 0 ? (
              <EmptyState title="Nenhuma avaliação ainda" description="Seja a primeira pessoa a compartilhar sua experiência." />
            ) : (
              avaliacoes.map((avaliacao) => (
                <article key={avaliacao.id} className={styles.avaliacao}>
                  <div className={styles.avaliacaoTopo}>
                    <strong>{avaliacao.hospede}</strong>
                    <Rating nota={avaliacao.nota} compact />
                  </div>
                  <p>{avaliacao.comentario}</p>
                  <footer>
                    {quartosPorId[avaliacao.quartoId]?.nome ?? 'Hospedagem'} · {formatarData(avaliacao.criadaEm?.slice(0, 10))}
                  </footer>
                </article>
              ))
            )}
          </div>

          {autenticado && (
            <aside className={styles.formCard}>
              <h2>Avaliar uma hospedagem</h2>
              {concluidas.length === 0 ? (
                <p className={styles.aviso}>
                  Você poderá avaliar depois de concluir uma hospedagem. As avaliações ficam disponíveis para
                  estadias já finalizadas.
                </p>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit(avaliar)} noValidate>
                  <FormField id="avaliacao-reserva" label="Hospedagem concluída" as="select" name="reserva">
                    {concluidas.map((reserva) => (
                      <option key={reserva.id} value={reserva.id}>
                        {quartosPorId[reserva.quartoId]?.nome ?? reserva.quartoId} · {formatarData(reserva.dataFim)}
                      </option>
                    ))}
                  </FormField>
                  <FormField id="avaliacao-nota" label="Nota" as="select" error={errors.nota?.message} {...register('nota')}>
                    {[5, 4, 3, 2, 1].map((nota) => (
                      <option key={nota} value={nota}>{nota} estrelas</option>
                    ))}
                  </FormField>
                  <FormField
                    id="avaliacao-comentario"
                    label="Comentário"
                    as="textarea"
                    rows={4}
                    error={errors.comentario?.message}
                    {...register('comentario')}
                  />
                  {feedback && <Alert tone="success">{feedback}</Alert>}
                  {erro && <Alert tone="danger">{erro}</Alert>}
                  <Button type="submit" variant="primary" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar avaliação'}
                  </Button>
                </form>
              )}
            </aside>
          )}
        </div>
      )}
    </div>
  )
}

export default ReviewsPage
