import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {Layout} from "./components";
import {GuestLayout} from "./components/GuestLayout/GuestLayout.tsx";

const DashboardPage = lazy(() => import('./pages/dashboard'))
const RegisterPage = lazy(() => import('./pages/register'))
const ResetPasswordPage = lazy(() => import('./pages/reset-password'))
const LoginPage = lazy(() => import('./pages/login'))
const RequestPasswordPage = lazy(() => import('./pages/request-password'))

function App() {

  return (
    <Routes>
        <Route path={'/'} element={<GuestLayout />}>
            <Route index element={<RegisterPage />} />
            <Route path={'/password-reset/:token'} element={<ResetPasswordPage />} />
            <Route path={'/password-request'} element={<RequestPasswordPage />} />
            <Route path={'/login'} element={<LoginPage />} />

            <Route path={'/app'} element={<Layout />}>
                <Route path={'dashboard'}  element={<DashboardPage />} />
            </Route>
        </Route>
    </Routes>
  )
}

export default App
