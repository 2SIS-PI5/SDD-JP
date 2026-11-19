import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ReservasPage from './ReservasPage.jsx'
import * as api from '../api/reservas.js'

vi.mock('../api/reservas.js')

const quartos = [
  { id: 'quarto-101', nome: 'Suíte Jardim', capacidadeMaxima: 2 },
  { id: 'quarto-201', nome: 'Suíte Família', capacidadeMaxima: 4 },
]
const existente = {
  id: 'reserva-001',
  hospede: 'Hóspede de demonstração',
  quartoId: 'quarto-101',
  dataInicio: '2026-12-10',
  dataFim: '2026-12-12',
  quantidadePessoas: 2,
  status: 'SOLICITADA',
}

async function preencher(user, { hospede = 'Ana', quarto = 'quarto-101', entrada = '2026-12-20', saida = '2026-12-22', pessoas = '2' } = {}) {
  await user.type(screen.getByLabelText(/hóspede/i), hospede)
  await user.selectOptions(screen.getByLabelText(/quarto/i), quarto)
  await user.type(screen.getByLabelText(/data de entrada/i), entrada)
  await user.type(screen.getByLabelText(/data de saída/i), saida)
  await user.clear(screen.getByLabelText(/quantidade de pessoas/i))
  await user.type(screen.getByLabelText(/quantidade de pessoas/i), pessoas)
}

beforeEach(() => {
  vi.resetAllMocks()
  api.listarQuartos.mockResolvedValue(quartos)
  api.listarReservas.mockResolvedValue([existente])
})

describe('ReservasPage', () => {
  it('mostra carregamento e depois as solicitações existentes', async () => {
    render(<ReservasPage />)
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
    expect(await screen.findByText('Hóspede de demonstração')).toBeInTheDocument()
    expect(screen.getAllByText(/suíte jardim/i).length).toBeGreaterThan(0)
  })

  it('mostra estado vazio quando não há solicitações', async () => {
    api.listarReservas.mockResolvedValue([])
    render(<ReservasPage />)
    expect(await screen.findByText(/nenhuma solicitação/i)).toBeInTheDocument()
  })

  it('não envia e mostra mensagens quando a data de saída não é posterior', async () => {
    const user = userEvent.setup()
    render(<ReservasPage />)
    await screen.findByText('Hóspede de demonstração')
    await preencher(user, { entrada: '2026-12-22', saida: '2026-12-20' })
    await user.click(screen.getByRole('button', { name: /solicitar reserva/i }))
    expect(await screen.findByText(/data de saída deve ser posterior/i)).toBeInTheDocument()
    expect(api.criarReserva).not.toHaveBeenCalled()
  })

  it('não envia quando a quantidade excede a capacidade ou há campo vazio', async () => {
    const user = userEvent.setup()
    render(<ReservasPage />)
    await screen.findByText('Hóspede de demonstração')
    await user.click(screen.getByRole('button', { name: /solicitar reserva/i }))
    expect((await screen.findAllByRole('alert')).length).toBeGreaterThan(0)
    await preencher(user, { pessoas: '5' })
    await user.click(screen.getByRole('button', { name: /solicitar reserva/i }))
    expect(await screen.findByText(/capacidade/i)).toBeInTheDocument()
    expect(api.criarReserva).not.toHaveBeenCalled()
  })

  it('cadastra uma solicitação válida e a exibe uma única vez', async () => {
    const user = userEvent.setup()
    api.criarReserva.mockImplementation(async (dados) => ({ id: 'nova', status: 'SOLICITADA', ...dados }))
    render(<ReservasPage />)
    await screen.findByText('Hóspede de demonstração')
    await preencher(user)
    await user.click(screen.getByRole('button', { name: /solicitar reserva/i }))
    await waitFor(() => expect(screen.getAllByText('Ana')).toHaveLength(1))
    expect(api.criarReserva).toHaveBeenCalledTimes(1)
    expect(api.listarReservas).toHaveBeenCalledTimes(1)
  })

  it('mostra erro na consulta inicial e permite tentar novamente', async () => {
    const user = userEvent.setup()
    api.listarQuartos.mockRejectedValueOnce(new Error('falha'))
    render(<ReservasPage />)
    expect(await screen.findByRole('alert')).toHaveTextContent(/não foi possível carregar/i)
    await user.click(screen.getByRole('button', { name: /tentar novamente/i }))
    expect(await screen.findByText('Hóspede de demonstração')).toBeInTheDocument()
  })

  it('mantém os dados do formulário quando o cadastro falha', async () => {
    const user = userEvent.setup()
    api.criarReserva.mockRejectedValue(new Error('falha'))
    render(<ReservasPage />)
    await screen.findByText('Hóspede de demonstração')
    await preencher(user)
    await user.click(screen.getByRole('button', { name: /solicitar reserva/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/não foi possível cadastrar/i)
    expect(screen.getByLabelText(/hóspede/i)).toHaveValue('Ana')
    expect(screen.getByLabelText(/data de entrada/i)).toHaveValue('2026-12-20')
    expect(screen.queryByText('Ana', { selector: 'li *' })).not.toBeInTheDocument()
  })
})
