import { useEffect, useRef, useState } from 'react'
import styles from './GuestSelector.module.css'

function Contador({ rotulo, descricao, valor, minimo, maximo, onChange }) {
  return (
    <div className={styles.linha}>
      <div>
        <p className={styles.rotulo}>{rotulo}</p>
        <p className={styles.descricao}>{descricao}</p>
      </div>
      <div className={styles.controles}>
        <button
          type="button"
          aria-label={`Diminuir ${rotulo.toLowerCase()}`}
          onClick={() => onChange(Math.max(minimo, valor - 1))}
          disabled={valor <= minimo}
        >
          −
        </button>
        <span aria-live="polite">{valor}</span>
        <button
          type="button"
          aria-label={`Aumentar ${rotulo.toLowerCase()}`}
          onClick={() => onChange(Math.min(maximo, valor + 1))}
          disabled={valor >= maximo}
        >
          +
        </button>
      </div>
    </div>
  )
}

function GuestSelector({ adultos, criancas, quartos, onChange }) {
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

  const hospedes = adultos + criancas

  const atualizarHospedes = (valor) => onChange({ adultos: valor, criancas: 0, quartos })
  const atualizarQuartos = (valor) => onChange({ adultos, criancas, quartos: valor })

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={aberto}
        aria-haspopup="dialog"
        onClick={() => setAberto((valor) => !valor)}
      >
        <span className={styles.campo}>
          <span className={styles.label}>Hóspedes</span>
          <span className={styles.value}>{hospedes}</span>
        </span>
        <span className={styles.separador} aria-hidden="true">
          ·
        </span>
        <span className={styles.campo}>
          <span className={styles.label}>Quartos</span>
          <span className={styles.value}>{quartos}</span>
        </span>
      </button>

      {aberto && (
        <div className={styles.popover} role="dialog" aria-label="Selecionar hóspedes">
          <Contador
            rotulo="Hóspedes"
            descricao="Total de pessoas"
            valor={hospedes}
            minimo={1}
            maximo={8}
            onChange={atualizarHospedes}
          />
          <Contador
            rotulo="Quartos"
            descricao="Acomodações"
            valor={quartos}
            minimo={1}
            maximo={4}
            onChange={atualizarQuartos}
          />
          <button type="button" className={styles.concluir} onClick={() => setAberto(false)}>
            Concluir
          </button>
        </div>
      )}
    </div>
  )
}

export default GuestSelector
