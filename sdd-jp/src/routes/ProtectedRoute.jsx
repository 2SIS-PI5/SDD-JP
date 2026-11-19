import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function ProtectedRoute({ children }) {
  const { autenticado } = useAuth()
  const location = useLocation()

  if (!autenticado) {
    const destino = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(destino)}`} replace />
  }

  return children
}

export default ProtectedRoute
