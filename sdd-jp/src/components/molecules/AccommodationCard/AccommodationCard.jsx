import { Link } from 'react-router-dom'
import Badge from '../../atoms/Badge/Badge.jsx'
import Rating from '../../atoms/Rating/Rating.jsx'
import { formatarMoeda } from '../../../utils/date.js'
import styles from './AccommodationCard.module.css'

function AccommodationCard({ quarto }) {
  return (
    <article className={styles.card}>
      <Link to={`/acomodacoes/${quarto.id}`} className={styles.media} aria-label={`Ver detalhes de ${quarto.nome}`}>
        <img src={quarto.imagens[0]} alt={`${quarto.nome} — acomodação do Hotel Sereno`} loading="lazy" />
        <Badge tone="accent" className={styles.categoria}>
          {quarto.categoria}
        </Badge>
      </Link>

      <div className={styles.body}>
        <div className={styles.topo}>
          <h3>
            <Link to={`/acomodacoes/${quarto.id}`}>{quarto.nome}</Link>
          </h3>
          <Rating nota={quarto.avaliacao} total={quarto.totalAvaliacoes} compact />
        </div>

        <p className={styles.descricao}>{quarto.descricao}</p>

        <ul className={styles.detalhes}>
          <li>Até {quarto.capacidadeMaxima} hóspedes</li>
          <li>{quarto.camas}</li>
        </ul>

        <ul className={styles.comodidades}>
          {quarto.comodidades.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.rodape}>
          <p className={styles.preco}>
            <span>{formatarMoeda(quarto.precoDiaria)}</span>
            <small>/ noite</small>
          </p>
          <Link to={`/acomodacoes/${quarto.id}`} className={styles.link}>
            Ver detalhes →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default AccommodationCard
