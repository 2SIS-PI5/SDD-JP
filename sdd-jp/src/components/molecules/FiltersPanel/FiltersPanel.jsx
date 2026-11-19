import Button from '../../atoms/Button/Button.jsx'
import { formatarMoeda } from '../../../utils/date.js'
import styles from './FiltersPanel.module.css'

function Alternar({ rotulo, marcado, onChange }) {
  return (
    <label className={styles.check}>
      <input type="checkbox" checked={marcado} onChange={onChange} />
      <span>{rotulo}</span>
    </label>
  )
}

function FiltersPanel({ filtros, onChange, categorias, comodidades, onLimpar }) {
  function alternarLista(campo, valor) {
    const atual = filtros[campo]
    const nova = atual.includes(valor) ? atual.filter((item) => item !== valor) : [...atual, valor]
    onChange({ ...filtros, [campo]: nova })
  }

  return (
    <aside className={styles.panel} aria-label="Filtros de acomodações">
      <div className={styles.topo}>
        <h2>Filtros</h2>
        <Button type="button" variant="ghost" size="sm" onClick={onLimpar}>
          Limpar
        </Button>
      </div>

      <fieldset className={styles.grupo}>
        <legend>Categoria</legend>
        {categorias.map((categoria) => (
          <Alternar
            key={categoria}
            rotulo={categoria}
            marcado={filtros.categorias.includes(categoria)}
            onChange={() => alternarLista('categorias', categoria)}
          />
        ))}
      </fieldset>

      <div className={styles.grupo}>
        <label htmlFor="filtro-capacidade">Capacidade mínima</label>
        <select
          id="filtro-capacidade"
          value={filtros.capacidade}
          onChange={(evento) => onChange({ ...filtros, capacidade: Number(evento.target.value) })}
        >
          <option value={0}>Qualquer</option>
          <option value={1}>1 hóspede</option>
          <option value={2}>2 hóspedes</option>
          <option value={3}>3 hóspedes</option>
          <option value={4}>4 hóspedes</option>
          <option value={5}>5 hóspedes</option>
          <option value={6}>6 hóspedes</option>
        </select>
      </div>

      <div className={styles.grupo}>
        <label htmlFor="filtro-preco">Preço máximo por noite</label>
        <input
          id="filtro-preco"
          type="range"
          min="200"
          max="1500"
          step="50"
          value={filtros.precoMaximo || 1500}
          onChange={(evento) => onChange({ ...filtros, precoMaximo: Number(evento.target.value) })}
        />
        <p className={styles.preco}>{filtros.precoMaximo ? `Até ${formatarMoeda(filtros.precoMaximo)}` : 'Qualquer valor'}</p>
      </div>

      <fieldset className={styles.grupo}>
        <legend>Comodidades</legend>
        {comodidades.map((comodidade) => (
          <Alternar
            key={comodidade}
            rotulo={comodidade}
            marcado={filtros.comodidades.includes(comodidade)}
            onChange={() => alternarLista('comodidades', comodidade)}
          />
        ))}
      </fieldset>
    </aside>
  )
}

export default FiltersPanel
