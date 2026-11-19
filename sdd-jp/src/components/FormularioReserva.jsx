import { useState } from 'react'

const VALORES_INICIAIS = {
  hospede: '',
  quartoId: '',
  dataInicio: '',
  dataFim: '',
  quantidadePessoas: '1',
}

function validar(valores, quartos) {
  const erros = {}
  const quarto = quartos.find((q) => q.id === valores.quartoId)
  const pessoas = Number(valores.quantidadePessoas)

  if (!valores.hospede.trim()) erros.hospede = 'Informe o nome do hóspede.'
  if (!quarto) erros.quartoId = 'Selecione um quarto.'
  if (!valores.dataInicio) erros.dataInicio = 'Informe a data de entrada.'
  if (!valores.dataFim) {
    erros.dataFim = 'Informe a data de saída.'
  } else if (valores.dataInicio && valores.dataFim <= valores.dataInicio) {
    erros.dataFim = 'A data de saída deve ser posterior à data de entrada.'
  }
  if (!Number.isInteger(pessoas) || pessoas < 1) {
    erros.quantidadePessoas = 'Informe uma quantidade de pessoas válida.'
  } else if (quarto && pessoas > quarto.capacidadeMaxima) {
    erros.quantidadePessoas = `A quantidade excede a capacidade do quarto (máximo ${quarto.capacidadeMaxima}).`
  }
  return erros
}

function FormularioReserva({ quartos, onSubmit, erroEnvio }) {
  const [valores, setValores] = useState(VALORES_INICIAIS)
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)

  function alterar(evento) {
    const { name, value } = evento.target
    setValores((atuais) => ({ ...atuais, [name]: value }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const encontrados = validar(valores, quartos)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEnviando(true)
    try {
      await onSubmit({
        hospede: valores.hospede.trim(),
        quartoId: valores.quartoId,
        dataInicio: valores.dataInicio,
        dataFim: valores.dataFim,
        quantidadePessoas: Number(valores.quantidadePessoas),
      })
      setValores(VALORES_INICIAIS)
    } catch {
      // A página exibe a mensagem; os valores permanecem no formulário.
    } finally {
      setEnviando(false)
    }
  }

  const campoErro = (nome) =>
    erros[nome] ? (
      <p className="erro-campo" role="alert" id={`erro-${nome}`}>
        {erros[nome]}
      </p>
    ) : null

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h2>Nova solicitação</h2>

      <label htmlFor="hospede">Hóspede</label>
      <input id="hospede" name="hospede" value={valores.hospede} onChange={alterar} aria-invalid={Boolean(erros.hospede)} />
      {campoErro('hospede')}

      <label htmlFor="quartoId">Quarto</label>
      <select id="quartoId" name="quartoId" value={valores.quartoId} onChange={alterar} aria-invalid={Boolean(erros.quartoId)}>
        <option value="">Selecione</option>
        {quartos.map((q) => (
          <option key={q.id} value={q.id}>
            {q.nome} (até {q.capacidadeMaxima} pessoas)
          </option>
        ))}
      </select>
      {campoErro('quartoId')}

      <label htmlFor="dataInicio">Data de entrada</label>
      <input id="dataInicio" name="dataInicio" type="date" value={valores.dataInicio} onChange={alterar} aria-invalid={Boolean(erros.dataInicio)} />
      {campoErro('dataInicio')}

      <label htmlFor="dataFim">Data de saída</label>
      <input id="dataFim" name="dataFim" type="date" value={valores.dataFim} onChange={alterar} aria-invalid={Boolean(erros.dataFim)} />
      {campoErro('dataFim')}

      <label htmlFor="quantidadePessoas">Quantidade de pessoas</label>
      <input id="quantidadePessoas" name="quantidadePessoas" type="number" min="1" value={valores.quantidadePessoas} onChange={alterar} aria-invalid={Boolean(erros.quantidadePessoas)} />
      {campoErro('quantidadePessoas')}

      {erroEnvio && (
        <p className="erro" role="alert">
          {erroEnvio}
        </p>
      )}

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Solicitar reserva'}
      </button>
    </form>
  )
}

export default FormularioReserva
