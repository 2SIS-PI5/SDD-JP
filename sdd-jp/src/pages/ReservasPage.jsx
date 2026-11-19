import { useEffect, useState } from 'react'
import { criarReserva, listarQuartos, listarReservas } from '../api/reservas.js'
import FormularioReserva from '../components/FormularioReserva.jsx'
import ListaReservas from '../components/ListaReservas.jsx'

function ReservasPage() {
  const [status, setStatus] = useState('carregando')
  const [quartos, setQuartos] = useState([])
  const [reservas, setReservas] = useState([])
  const [erroEnvio, setErroEnvio] = useState('')

  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    Promise.all([listarQuartos(), listarReservas()])
      .then(([quartosApi, reservasApi]) => {
        if (!ativo) return
        setQuartos(quartosApi)
        setReservas(reservasApi)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [tentativa])

  function tentarNovamente() {
    setStatus('carregando')
    setTentativa((n) => n + 1)
  }

  async function cadastrar(dados) {
    setErroEnvio('')
    try {
      const criada = await criarReserva(dados)
      setReservas((atuais) => [...atuais, criada])
    } catch (erro) {
      setErroEnvio('Não foi possível cadastrar a solicitação. Tente novamente.')
      throw erro
    }
  }

  return (
    <main className="pagina">
      <h1>Reservas do hotel</h1>

      {status === 'carregando' && <p>Carregando...</p>}

      {status === 'erro' && (
        <div role="alert" className="erro">
          <p>Não foi possível carregar os dados. Verifique se a API está em execução.</p>
          <button type="button" onClick={tentarNovamente}>
            Tentar novamente
          </button>
        </div>
      )}

      {status === 'pronto' && (
        <>
          <FormularioReserva quartos={quartos} onSubmit={cadastrar} erroEnvio={erroEnvio} />
          <section>
            <h2>Solicitações</h2>
            <ListaReservas reservas={reservas} quartos={quartos} />
          </section>
        </>
      )}
    </main>
  )
}

export default ReservasPage
