import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/molecules/SearchBar/SearchBar.jsx'
import AccommodationCard from '../../components/molecules/AccommodationCard/AccommodationCard.jsx'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import EmptyState from '../../components/atoms/EmptyState/EmptyState.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import Rating from '../../components/atoms/Rating/Rating.jsx'
import { listarDestaques } from '../../services/accommodationService.js'
import styles from './HomePage.module.css'

const EXPERIENCIAS = [
  {
    titulo: 'Piscina e jardins',
    texto: 'Um oásis de água tranquila cercado por vegetação nativa, aberto do amanhecer ao anoitecer.',
    imagem:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    titulo: 'Spa Sereno',
    texto: 'Rituais de relaxamento com óleos botânicos e atendimento personalizado.',
    imagem:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    titulo: 'Restaurante Origem',
    texto: 'Cozinha autoral com ingredientes locais, servida em um salão de luz natural.',
    imagem:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
]

const GALERIA = [
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
]

const DIFERENCIAIS = [
  { titulo: 'Localização', texto: 'A poucos minutos dos principais pontos culturais e gastronômicos da cidade.' },
  { titulo: 'Café da manhã', texto: 'Servido diariamente com pães artesanais, frutas da estação e café especial.' },
  { titulo: 'Concierge', texto: 'Equipe dedicada a organizar passeios, reservas e experiências sob medida.' },
  { titulo: 'Sustentabilidade', texto: 'Energia renovável, gestão de resíduos e parcerias com produtores locais.' },
]

const AVALIACOES = [
  {
    nome: 'Marina A.',
    texto: 'O jardim ao amanhecer é ainda mais bonito do que nas fotos. Atendimento impecável do início ao fim.',
    nota: 5,
  },
  {
    nome: 'Rafael M.',
    texto: 'Viajamos em família e a suíte acomodou todos com bastante conforto. O café da manhã é memorável.',
    nota: 5,
  },
  {
    nome: 'Camila R.',
    texto: 'O chalé é muito reservado e silencioso. Voltaria com certeza para uma estadia mais longa.',
    nota: 4,
  },
]

function HomePage() {
  const [destaques, setDestaques] = useState([])
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    listarDestaques()
      .then((dados) => {
        if (!ativo) return
        setDestaques(dados)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [tentativa])

  const tentarNovamente = useCallback(() => {
    setStatus('carregando')
    setTentativa((valor) => valor + 1)
  }, [])

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.eyebrow}>Hotel Sereno · São Paulo</p>
          <h1>Uma experiência única de conforto e hospitalidade.</h1>
          <p className={styles.heroText}>
            Um refúgio contemporâneo onde arquitetura, natureza e cuidado se encontram para criar
            estadias que permanecem na memória.
          </p>
          <div className={styles.heroSearch}>
            <SearchBar />
          </div>
        </div>
      </section>

      <section className={`section ${styles.intro}`}>
        <div className={`container ${styles.introGrid}`}>
          <div className={styles.introMedia}>
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
              alt="Fachada iluminada do Hotel Sereno ao entardecer"
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow">Bem-vindo</span>
            <h2>Um hotel para desacelerar sem abrir mão do essencial.</h2>
            <p>
              No Hotel Sereno, cada ambiente foi pensado para equilibrar silêncio, luz natural e
              conforto. Dos jardins à mesa do restaurante, a hospitalidade acontece nos detalhes.
            </p>
            <p>
              São 10 acomodações únicas, espaços de convivência abertos e uma equipe que conhece o
              ritmo de quem chega para descansar.
            </p>
            <div className={styles.stats}>
              <div>
                <strong>10</strong>
                <span>acomodações</span>
              </div>
              <div>
                <strong>4,8</strong>
                <span>nota média</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>recepção</span>
              </div>
            </div>
            <Button as={Link} to="/sobre" variant="ghost">
              Conhecer o hotel
            </Button>
          </div>
        </div>
      </section>

      <section className={`section section--alt ${styles.destaques}`} id="acomodacoes">
        <div className="container">
          <div className={styles.sectionTop}>
            <div className="section-heading">
              <span className="eyebrow">Acomodações</span>
              <h2>Escolha o seu refúgio</h2>
              <p>Da praticidade de um quarto standard à exclusividade da Suíte Presidencial.</p>
            </div>
            <Button as={Link} to="/acomodacoes" variant="ghost" size="sm">
              Ver todas
            </Button>
          </div>

          {status === 'carregando' && (
            <div className={styles.loading}>
              <Spinner label="Carregando acomodações em destaque..." />
            </div>
          )}

          {status === 'erro' && (
            <Alert
              tone="danger"
              title="Não foi possível carregar as acomodações"
              action={
                <Button type="button" variant="ghost" size="sm" onClick={tentarNovamente}>
                  Tentar novamente
                </Button>
              }
            >
              Verifique se a API mock está em execução.
            </Alert>
          )}

          {status === 'pronto' && destaques.length === 0 && (
            <EmptyState
              title="Nenhuma acomodação em destaque"
              description="Explore o catálogo completo para encontrar a estadia ideal."
              action={
                <Button as={Link} to="/acomodacoes" variant="primary" size="sm">
                  Ver acomodações
                </Button>
              }
            />
          )}

          {status === 'pronto' && destaques.length > 0 && (
            <div className={styles.grid}>
              {destaques.map((quarto) => (
                <AccommodationCard key={quarto.id} quarto={quarto} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" id="experiencias">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Experiências</span>
            <h2>Momentos que fazem parte da estadia</h2>
            <p>Espaços e rituais pensados para que o tempo passe no seu ritmo.</p>
          </div>
          <div className={styles.experiencias}>
            {EXPERIENCIAS.map((experiencia) => (
              <article key={experiencia.titulo} className={styles.experiencia}>
                <img src={experiencia.imagem} alt="" loading="lazy" />
                <div>
                  <h3>{experiencia.titulo}</h3>
                  <p>{experiencia.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section section--alt ${styles.galeriaSecao}`}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Galeria</span>
            <h2>Um olhar sobre o Sereno</h2>
          </div>
          <div className={styles.galeria}>
            {GALERIA.map((imagem, indice) => (
              <img
                key={imagem}
                src={imagem}
                alt={`Ambiente do Hotel Sereno ${indice + 1}`}
                loading="lazy"
                className={indice === 0 ? styles.galeriaDestaque : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.diferenciais}`}>
          {DIFERENCIAIS.map((item) => (
            <div key={item.titulo}>
              <span className={styles.marcador} aria-hidden="true">
                ✦
              </span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`section section--alt ${styles.avaliacoes}`}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Avaliações</span>
            <h2>O que nossos hóspedes dizem</h2>
          </div>
          <div className={styles.avaliacoesGrid}>
            {AVALIACOES.map((avaliacao) => (
              <blockquote key={avaliacao.nome} className={styles.depoimento}>
                <Rating nota={avaliacao.nota} compact />
                <p>“{avaliacao.texto}”</p>
                <footer>{avaliacao.nome}</footer>
              </blockquote>
            ))}
          </div>
          <div className={styles.avaliacoesCta}>
            <Button as={Link} to="/avaliacoes" variant="ghost" size="sm">
              Ver todas as avaliações
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaContent}`}>
          <div>
            <span className="eyebrow">Reserve agora</span>
            <h2>O seu próximo descanso começa aqui.</h2>
            <p>Consulte a disponibilidade e escolha a acomodação que combina com o seu ritmo.</p>
          </div>
          <Button as={Link} to="/buscar" variant="secondary" size="lg">
            Buscar hospedagem
          </Button>
        </div>
      </section>

      <section className={`section ${styles.localizacao}`}>
        <div className={`container ${styles.localizacaoGrid}`}>
          <div>
            <span className="eyebrow">Localização</span>
            <h2>No coração do Jardim Sereno</h2>
            <p>
              Av. das Palmeiras, 1200 — Jardim Sereno, São Paulo. A 12 minutos do Museu de Arte
              Moderna e a 20 minutos do aeroporto de Congonhas.
            </p>
            <ul className={styles.distancias}>
              <li><strong>1,2 km</strong> do Parque das Palmeiras</li>
              <li><strong>3,5 km</strong> da Avenida Paulista</li>
              <li><strong>20 min</strong> do Aeroporto de Congonhas</li>
            </ul>
          </div>
          <div className={styles.mapa} aria-label="Mapa ilustrativo da localização do hotel">
            <span>Mapa ilustrativo</span>
            <strong>Jardim Sereno</strong>
            <p>Av. das Palmeiras, 1200</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
