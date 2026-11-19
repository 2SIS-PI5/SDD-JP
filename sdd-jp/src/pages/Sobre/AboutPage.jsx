import { Link } from 'react-router-dom'
import Button from '../../components/atoms/Button/Button.jsx'
import styles from '../institutional.module.css'

function AboutPage() {
  return (
    <div className={styles.about}>
      <section className={styles.aboutHero}>
        <div className={`container ${styles.aboutHeroContent}`}>
          <span className={styles.eyebrow}>Sobre o hotel</span>
          <h1>Uma casa aberta ao tempo</h1>
          <p>
            O Hotel Sereno nasceu do desejo de criar um lugar onde a cidade desacelera. Um projeto de
            arquitetura contemporânea, jardins nativos e hospitalidade afetuosa.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.historia}`}>
          <div>
            <span className="eyebrow">Nossa história</span>
            <h2>Hospitalidade que se constrói nos detalhes</h2>
            <p>
              Inaugurado em 2018 no Jardim Sereno, o hotel ocupa um antigo casarão restaurado e uma ala
              nova desenhada para conversar com o jardim. Desde o início, a proposta foi receber poucos
              hóspedes por vez, com atenção genuína.
            </p>
            <p>
              Hoje somos um refúgio de 10 acomodações, um restaurante aberto ao público e espaços de
              convivência que convidam a ficar. A equipe acompanha cada estadia de perto, sem excessos.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80"
            alt="Hall de entrada do Hotel Sereno"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section section--alt">
        <div className={`container ${styles.valores}`}>
          <div>
            <span className="eyebrow">Conceito</span>
            <h2>Menos, melhor</h2>
            <p>
              Acreditamos em uma hospitalidade sem ruído: materiais honestos, iluminação natural, comida
              feita no ritmo certo e uma equipe que antecipa o necessário sem invadir.
            </p>
          </div>
          <div>
            <span className="eyebrow">Estrutura</span>
            <h2>Espaços para ficar</h2>
            <p>
              Jardim tropical, piscina, spa, restaurante, biblioteca e salas de estar. Todos os espaços
              foram pensados para leitura, conversa e descanso.
            </p>
          </div>
          <div>
            <span className="eyebrow">Serviços</span>
            <h2>Cuidado próximo</h2>
            <p>
              Café da manhã artesanal, concierge, serviço de quarto, traslados e experiências com
              parceiros locais. Tudo coordenado pela recepção 24 horas.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.galeriaTexto}`}>
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
            alt="Piscina do Hotel Sereno ao entardecer"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">A experiência</span>
            <h2>Chegar e respirar</h2>
            <p>
              A experiência começa no portão: o som da água, o cheiro do jardim e a luz filtrada pelas
              árvores. Dali em diante, cada detalhe foi desenhado para que você esqueça o relógio.
            </p>
            <Button as={Link} to="/acomodacoes" variant="ghost">
              Conhecer as acomodações
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.ctaFinal}>
        <div className={`container ${styles.ctaConteudo}`}>
          <h2>Venha viver o Sereno</h2>
          <Button as={Link} to="/buscar" variant="secondary" size="lg">
            Consultar disponibilidade
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
