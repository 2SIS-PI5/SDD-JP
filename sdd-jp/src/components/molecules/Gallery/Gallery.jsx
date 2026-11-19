import { useEffect, useState } from 'react'
import styles from './Gallery.module.css'

function Gallery({ imagens, nome }) {
  const [ativa, setAtiva] = useState(0)
  const [ampliada, setAmpliada] = useState(false)
  const lista = imagens.length ? imagens : ['']

  useEffect(() => {
    if (!ampliada) return
    function aoTeclar(evento) {
      if (evento.key === 'Escape') setAmpliada(false)
      if (evento.key === 'ArrowRight') setAtiva((valor) => (valor + 1) % lista.length)
      if (evento.key === 'ArrowLeft') setAtiva((valor) => (valor - 1 + lista.length) % lista.length)
    }
    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [ampliada, lista.length])

  return (
    <div className={styles.gallery}>
      <button
        type="button"
        className={styles.main}
        onClick={() => setAmpliada(true)}
        aria-label={`Ampliar foto principal de ${nome}`}
      >
        <img src={lista[ativa]} alt={`${nome} — foto ${ativa + 1}`} />
      </button>

      {lista.length > 1 && (
        <div className={styles.thumbs} role="group" aria-label="Miniaturas da acomodação">
          {lista.map((imagem, indice) => (
            <button
              key={`${imagem}-${indice}`}
              type="button"
              className={indice === ativa ? styles.ativa : undefined}
              onClick={() => setAtiva(indice)}
              aria-label={`Ver foto ${indice + 1}`}
              aria-pressed={indice === ativa}
            >
              <img src={imagem} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {ampliada && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de ${nome}`}
          onClick={() => setAmpliada(false)}
        >
          <button
            type="button"
            className={styles.fechar}
            onClick={() => setAmpliada(false)}
            aria-label="Fechar galeria"
          >
            ✕
          </button>
          <img
            src={lista[ativa]}
            alt={`${nome} — foto ${ativa + 1}`}
            onClick={(evento) => evento.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default Gallery
