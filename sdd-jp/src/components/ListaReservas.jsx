function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function ListaReservas({ reservas, quartos }) {
  if (reservas.length === 0) {
    return <p>Nenhuma solicitação cadastrada.</p>
  }

  const nomeDoQuarto = (id) => quartos.find((q) => q.id === id)?.nome ?? id

  return (
    <ul className="lista-reservas">
      {reservas.map((r) => (
        <li key={r.id}>
          <strong>{r.hospede}</strong>
          <span>
            {nomeDoQuarto(r.quartoId)} · {formatarData(r.dataInicio)} a {formatarData(r.dataFim)} · {r.quantidadePessoas}{' '}
            {r.quantidadePessoas === 1 ? 'pessoa' : 'pessoas'}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default ListaReservas
