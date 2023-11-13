import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {Layout} from "./components";

const DashboardPage = lazy(() => import('./pages/dashboard'))
const RegisterPage = lazy(() => import('./pages/register'))

function App() {

  return (
    <Routes>
        <Route path={'/'} element={<Layout />}>
            <Route path={'/'} element={<DashboardPage />} />
            <Route path={'register'} element={<RegisterPage />} />
        </Route>
    </Routes>
  )
}

export default App
