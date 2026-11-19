import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Alert from '../../atoms/Alert/Alert.jsx'
import Button from '../../atoms/Button/Button.jsx'
import FormField from '../../atoms/FormField/FormField.jsx'
import { formatarMoeda } from '../../../utils/date.js'
import styles from './PaymentForm.module.css'

const METODOS = [
  { id: 'PIX', rotulo: 'PIX', descricao: 'Aprovação imediata na simulação' },
  { id: 'CARTAO_CREDITO', rotulo: 'Crédito', descricao: 'Cartão fictício' },
  { id: 'CARTAO_DEBITO', rotulo: 'Débito', descricao: 'Cartão fictício' },
]

const esquemaCartao = z.object({
  numero: z.string().regex(/^\d{16}$/, 'Informe 16 dígitos fictícios.'),
  titular: z.string().min(3, 'Informe o nome do titular.'),
  validade: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA.'),
  cvv: z.string().regex(/^\d{3}$/, 'Informe 3 dígitos.'),
})

const CODIGO_PIX = '00020126580014BR.GOV.BCB.PIX0136hotel-sereno-demonstracao5204000053039865802BR5925HOTEL SERENO DEMONSTRACAO6009SAO PAULO62070503***6304ABCD'

function padraoQr(semente) {
  const tamanho = 21
  const celulas = []
  let valor = 0
  for (let i = 0; i < semente.length; i += 1) valor = (valor * 31 + semente.charCodeAt(i)) >>> 0
  for (let y = 0; y < tamanho; y += 1) {
    for (let x = 0; x < tamanho; x += 1) {
      valor = (valor * 1103515245 + 12345) >>> 0
      const marcador = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      celulas.push(marcador ? (x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5)) : valor % 3 === 0)
    }
  }
  return celulas
}

function PaymentForm({ total, onPagar, processando }) {
  const [metodo, setMetodo] = useState('PIX')
  const [resultado, setResultado] = useState('aprovar')
  const [copiado, setCopiado] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquemaCartao) })

  const qr = useMemo(() => padraoQr(CODIGO_PIX), [])

  async function copiarPix() {
    try {
      await navigator.clipboard.writeText(CODIGO_PIX)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  function enviarCartao(dados) {
    onPagar({
      metodo,
      parcelas: Number(dados.parcelas) || 1,
      resultado,
      cartaoFinal: dados.numero.slice(-4),
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.metodos} role="tablist" aria-label="Forma de pagamento">
        {METODOS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={metodo === item.id}
            className={metodo === item.id ? styles.metodoAtivo : styles.metodo}
            onClick={() => setMetodo(item.id)}
          >
            <strong>{item.rotulo}</strong>
            <span>{item.descricao}</span>
          </button>
        ))}
      </div>

      <Alert tone="info" title="Pagamento simulado">
        Nenhuma cobrança real será realizada. Os dados do cartão não são armazenados.
      </Alert>

      {metodo === 'PIX' ? (
        <div className={styles.pix}>
          <div className={styles.qr} role="img" aria-label="QR Code demonstrativo do PIX">
            {qr.map((ativo, indice) => (
              <span key={indice} className={ativo ? styles.celulaAtiva : styles.celula} />
            ))}
          </div>
          <div className={styles.pixInfo}>
            <p>Escaneie o QR Code demonstrativo ou copie o código abaixo.</p>
            <code className={styles.codigo}>{CODIGO_PIX}</code>
            <Button type="button" variant="ghost" size="sm" onClick={copiarPix}>
              {copiado ? 'Código copiado' : 'Copiar código PIX'}
            </Button>
          </div>
        </div>
      ) : (
        <form className={styles.cartao} onSubmit={handleSubmit(enviarCartao)} noValidate>
          <FormField
            id="numero-cartao"
            label="Número do cartão fictício"
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
            maxLength={16}
            error={errors.numero?.message}
            {...register('numero')}
          />
          <FormField
            id="titular-cartao"
            label="Nome do titular"
            placeholder="Como impresso no cartão"
            error={errors.titular?.message}
            {...register('titular')}
          />
          <div className={styles.linha}>
            <FormField
              id="validade-cartao"
              label="Validade"
              placeholder="MM/AA"
              maxLength={5}
              error={errors.validade?.message}
              {...register('validade')}
            />
            <FormField
              id="cvv-cartao"
              label="CVV"
              placeholder="000"
              maxLength={3}
              inputMode="numeric"
              error={errors.cvv?.message}
              {...register('cvv')}
            />
          </div>
          {metodo === 'CARTAO_CREDITO' && (
            <FormField id="parcelas" label="Parcelamento" as="select" {...register('parcelas')}>
              {[1, 2, 3, 4, 6].map((parcela) => (
                <option key={parcela} value={parcela}>
                  {parcela}x de {formatarMoeda(total / parcela)} sem juros
                </option>
              ))}
            </FormField>
          )}
          <Button type="submit" variant="primary" size="lg" full disabled={processando}>
            {processando ? 'Processando...' : `Pagar ${formatarMoeda(total)}`}
          </Button>
        </form>
      )}

      <div className={styles.simulacao}>
        <label htmlFor="resultado-simulacao">Resultado da simulação</label>
        <select id="resultado-simulacao" value={resultado} onChange={(evento) => setResultado(evento.target.value)}>
          <option value="aprovar">Aprovar pagamento</option>
          <option value="recusar">Recusar pagamento</option>
        </select>
      </div>

      {metodo === 'PIX' && (
        <Button
          type="button"
          variant="primary"
          size="lg"
          full
          disabled={processando}
          onClick={() => onPagar({ metodo, parcelas: 1, resultado })}
        >
          {processando ? 'Processando...' : `Confirmar PIX de ${formatarMoeda(total)}`}
        </Button>
      )}
    </div>
  )
}

export default PaymentForm
