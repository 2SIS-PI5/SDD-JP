import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import 'react-day-picker/style.css'
import { deISO, formatarData, paraISO } from '../../../utils/date.js'
import styles from './DateRangePicker.module.css'

function DateRangePicker({ inicio, fim, onChange, id = 'datas' }) {
  const [aberto, setAberto] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!aberto) return
    function aoClicar(evento) {
      if (!containerRef.current?.contains(evento.target)) setAberto(false)
    }
    function aoTeclar(evento) {
      if (evento.key === 'Escape') setAberto(false)
    }
    document.addEventListener('mousedown', aoClicar)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicar)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto])

  const selecionado = {
    from: deISO(inicio),
    to: deISO(fim),
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        id={id}
        className={styles.trigger}
        aria-expanded={aberto}
        aria-haspopup="dialog"
        onClick={() => setAberto((valor) => !valor)}
      >
        <span className={styles.label}>Check-in / Check-out</span>
        <span className={styles.value}>
          {inicio ? formatarData(inicio) : 'Selecionar'} — {fim ? formatarData(fim) : 'Selecionar'}
        </span>
      </button>

      {aberto && (
        <div className={styles.popover} role="dialog" aria-label="Selecionar datas da hospedagem">
          <DayPicker
            mode="range"
            selected={selecionado}
            onSelect={(intervalo) => {
              onChange({
                inicio: paraISO(intervalo?.from),
                fim: paraISO(intervalo?.to),
              })
              if (intervalo?.from && intervalo?.to) setAberto(false)
            }}
            locale={ptBR}
            disabled={{ before: new Date() }}
            defaultMonth={deISO(inicio) ?? new Date()}
            numberOfMonths={1}
            showOutsideDays
          />
        </div>
      )}
    </div>
  )
}

export default DateRangePicker
