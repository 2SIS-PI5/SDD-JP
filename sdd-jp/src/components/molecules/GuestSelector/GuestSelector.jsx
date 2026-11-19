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

  const total = adultos + criancas

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={aberto}
        aria-haspopup="dialog"
        onClick={() => setAberto((valor) => !valor)}
      >
        <span className={styles.label}>Hóspedes</span>
        <span className={styles.value}>
          {total} {total === 1 ? 'hóspede' : 'hóspedes'} · {quartos} {quartos === 1 ? 'quarto' : 'quartos'}
        </span>
      </button>

      {aberto && (
        <div className={styles.popover} role="dialog" aria-label="Selecionar hóspedes">
          <Contador
            rotulo="Adultos"
            descricao="13 anos ou mais"
            valor={adultos}
            minimo={1}
            maximo={8}
            onChange={(valor) => onChange({ adultos: valor, criancas, quartos })}
          />
          <Contador
            rotulo="Crianças"
            descricao="Até 12 anos"
            valor={criancas}
            minimo={0}
            maximo={6}
            onChange={(valor) => onChange({ adultos, criancas: valor, quartos })}
          />
          <Contador
            rotulo="Quartos"
            descricao="Acomodações"
            valor={quartos}
            minimo={1}
            maximo={4}
            onChange={(valor) => onChange({ adultos, criancas, quartos: valor })}
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
