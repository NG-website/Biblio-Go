import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./components/Router/UserRouter"
import NotFound from "./components/Router/NotFound"
// import AdminRouter from "./components/Router/AdminRouter"
import Layout from "./components/layout/Layout"
import Home from "./components/acceuil/Home"
import AdminRouter from "./components/Router/AdminRouter"
import { useAuthContext } from "./components/Context/AuthContext"

const App: React.FC = () => {
  const {user} = useAuthContext()
 console.log(user)
  const admin = user? user?.role === true : false
  console.log(admin)
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {admin ?
          <Route path="/admin/*" element={<AdminRouter />} />
          :
          <Route path="/admin/*" element={<NotFound />} />
        }

        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
