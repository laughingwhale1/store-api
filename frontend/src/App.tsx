import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {Layout} from "./components";

const HomePage = lazy(() => import('./pages/home'))

function App() {

  return (
    <Routes>
        <Route path={'/'} element={<Layout />}>
            <Route path={'/'} element={<HomePage />} />
        </Route>
    </Routes>
  )
}

export default App
