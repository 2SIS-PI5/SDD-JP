import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout/PublicLayout.jsx'
import AuthLayout from '../layouts/AuthLayout/AuthLayout.jsx'
import AccountLayout from '../layouts/AccountLayout/AccountLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

import HomePage from '../pages/Home/HomePage.jsx'
import AccommodationsPage from '../pages/Acomodacoes/AccommodationsPage.jsx'
import AccommodationDetailPage from '../pages/AcomodacaoDetail/AccommodationDetailPage.jsx'
import SearchResultsPage from '../pages/Buscar/SearchResultsPage.jsx'
import ReservePage from '../pages/Reservar/ReservePage.jsx'
import ReviewsPage from '../pages/Avaliacoes/ReviewsPage.jsx'
import ContactPage from '../pages/Contato/ContactPage.jsx'
import AboutPage from '../pages/Sobre/AboutPage.jsx'
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx'

import LoginPage from '../pages/Auth/LoginPage.jsx'
import RegisterPage from '../pages/Auth/RegisterPage.jsx'
import RecoverPasswordPage from '../pages/Auth/RecoverPasswordPage.jsx'
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage.jsx'

import AccountHome from '../pages/MinhaConta/AccountHome.jsx'
import AccountReservations from '../pages/MinhaConta/AccountReservations.jsx'
import ReservationDetail from '../pages/MinhaConta/ReservationDetail.jsx'
import AccountProfile from '../pages/MinhaConta/AccountProfile.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="acomodacoes" element={<AccommodationsPage />} />
        <Route path="acomodacoes/:id" element={<AccommodationDetailPage />} />
        <Route path="buscar" element={<SearchResultsPage />} />
        <Route
          path="reservar/:id"
          element={
            <ProtectedRoute>
              <ReservePage />
            </ProtectedRoute>
          }
        />
        <Route path="avaliacoes" element={<ReviewsPage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route
          path="minha-conta"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountHome />} />
          <Route path="reservas" element={<AccountReservations />} />
          <Route path="reservas/:id" element={<ReservationDetail />} />
          <Route path="perfil" element={<AccountProfile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<RegisterPage />} />
        <Route path="recuperar-senha" element={<RecoverPasswordPage />} />
        <Route path="redefinir-senha" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
