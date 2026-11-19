import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../atoms/Button/Button.jsx'
import DateRangePicker from '../DateRangePicker/DateRangePicker.jsx'
import GuestSelector from '../GuestSelector/GuestSelector.jsx'
import { adicionarDias, hojeISO, intervaloValido } from '../../../utils/date.js'
import styles from './SearchBar.module.css'

function SearchBar({ valoresIniciais = {}, variante = 'hero' }) {
  const navigate = useNavigate()
  const [inicio, setInicio] = useState(valoresIniciais.inicio ?? adicionarDias(hojeISO(), 1))
  const [fim, setFim] = useState(valoresIniciais.fim ?? adicionarDias(hojeISO(), 3))
  const [adultos, setAdultos] = useState(Number(valoresIniciais.adultos) || 2)
  const [criancas, setCriancas] = useState(Number(valoresIniciais.criancas) || 0)
  const [quartos, setQuartos] = useState(Number(valoresIniciais.quartos) || 1)
  const [erro, setErro] = useState('')

  function buscar(evento) {
    evento.preventDefault()
    if (!intervaloValido(inicio, fim)) {
      setErro('A data de saída deve ser posterior à data de entrada.')
      return
    }
    if (inicio < hojeISO()) {
      setErro('A data de entrada não pode estar no passado.')
      return
    }
    setErro('')
    const params = new URLSearchParams({ inicio, fim, adultos, criancas, quartos })
    navigate(`/buscar?${params.toString()}`)
  }

  return (
    <form
      className={`${styles.search} ${variante === 'compacta' ? styles.compacta : ''}`}
      onSubmit={buscar}
      role="search"
      aria-label="Buscar hospedagem"
    >
      <div className={styles.campos}>
        <DateRangePicker inicio={inicio} fim={fim} onChange={(datas) => {
          setInicio(datas.inicio)
          setFim(datas.fim)
        }} />
        <GuestSelector
          adultos={adultos}
          criancas={criancas}
          quartos={quartos}
          onChange={(valores) => {
            setAdultos(valores.adultos)
            setCriancas(valores.criancas)
            setQuartos(valores.quartos)
          }}
        />
        <Button type="submit" variant="secondary" size="md" className={styles.botao}>
          Buscar hospedagem
        </Button>
      </div>
      {erro && (
        <p className={styles.erro} role="alert">
          {erro}
        </p>
      )}
    </form>
  )
}

export default SearchBar
