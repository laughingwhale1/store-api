import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {AdminLayout} from "./components";
import {GuestLayout} from "./components/GuestLayout/GuestLayout.tsx";

const DashboardPage = lazy(() => import('./pages/admin/dashboard'))
const UsersPage = lazy(() => import('./pages/admin/users'))
const ProductsPage = lazy(() => import('./pages/admin/products'))
const ReportsPage = lazy(() => import('./pages/admin/reports'))
const RegisterPage = lazy(() => import('./pages/auth/register'))
const ResetPasswordPage = lazy(() => import('./pages/auth/reset-password'))
const LoginPage = lazy(() => import('./pages/auth/login'))
const RequestPasswordPage = lazy(() => import('./pages/auth/request-password'))
const NotFoundPage = lazy(() => import('./pages/not-found'))

function App() {

  return (
    <Routes>
        <Route path={'/'} element={<GuestLayout />}>
            <Route index element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/password-reset/:token'} element={<ResetPasswordPage />} />
            <Route path={'/password-request'} element={<RequestPasswordPage />} />

            <Route path={'/app'} element={<AdminLayout />}>
                <Route path={'dashboard'} element={<DashboardPage />} />
                <Route path={'products'} element={<ProductsPage />} />
                <Route path={'users'} element={<UsersPage />} />
                <Route path={'reports'} element={<ReportsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
  )
}

export default App
