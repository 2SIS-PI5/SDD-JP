import { Link } from 'react-router-dom'
import Button from '../../components/atoms/Button/Button.jsx'
import styles from '../institutional.module.css'

function NotFoundPage() {
  return (
    <div className={`container ${styles.page}`} style={{ textAlign: 'center', paddingBlock: '6rem' }}>
      <span className="eyebrow">Erro 404</span>
      <h1>Este caminho não existe</h1>
      <p>A página que você procura pode ter sido movida ou o endereço foi digitado incorretamente.</p>
      <Button as={Link} to="/" variant="primary">
        Voltar ao início
      </Button>
    </div>
  )
}

export default NotFoundPage
