import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {Layout} from "./components";

const DashboardPage = lazy(() => import('./pages/dashboard'))
const RegisterPage = lazy(() => import('./pages/register'))
const ResetPasswordPage = lazy(() => import('./pages/reset-password'))
const LoginPage = lazy(() => import('./pages/login'))
const RequestPasswordPage = lazy(() => import('./pages/request-password'))

function App() {

  return (
    <Routes>
        <Route path={'/'} element={<Layout />}>
            <Route path={'/app/dashboard'} element={<DashboardPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/password-reset/:token'} element={<ResetPasswordPage />} />
            <Route path={'/password-request'} element={<RequestPasswordPage />} />
            <Route path={'/login'} element={<LoginPage />} />
        </Route>
    </Routes>
  )
}

export default App
