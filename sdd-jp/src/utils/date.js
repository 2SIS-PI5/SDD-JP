const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
const FORMATADOR_DATA_LONGA = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

export function hojeISO() {
  return paraISO(new Date())
}

export function paraISO(data) {
  if (!data) return ''
  const d = data instanceof Date ? data : new Date(data)
  if (Number.isNaN(d.getTime())) return ''
  const ano = d.getFullYear()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export function deISO(iso) {
  if (!iso) return undefined
  const [ano, mes, dia] = iso.split('-').map(Number)
  if (!ano || !mes || !dia) return undefined
  return new Date(ano, mes - 1, dia)
}

export function formatarData(iso) {
  const data = deISO(iso)
  return data ? FORMATADOR_DATA.format(data) : '—'
}

export function formatarDataLonga(iso) {
  const data = deISO(iso)
  return data ? FORMATADOR_DATA_LONGA.format(data) : '—'
}

export function calcularDiarias(inicio, fim) {
  const a = deISO(inicio)
  const b = deISO(fim)
  if (!a || !b) return 0
  const diferenca = Math.round((b.getTime() - a.getTime()) / 86400000)
  return diferenca > 0 ? diferenca : 0
}

export function adicionarDias(iso, dias) {
  const data = deISO(iso)
  if (!data) return ''
  data.setDate(data.getDate() + dias)
  return paraISO(data)
}

export function intervaloValido(inicio, fim) {
  return Boolean(inicio && fim && calcularDiarias(inicio, fim) > 0)
}

export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(valor) || 0)
}
