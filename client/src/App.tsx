import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./components/Router/userRouter"
import NotFound from "./components/Router/NotFound"
// import AdminRouter from "./components/Router/AdminRouter"
import Layout from "./components/layout/Layout"
import Home from "./components/acceuil/Home"
import AdminRouter from "./components/Router/AdminRouter"
import { useAuthContext } from "./components/Context/AuthContext"

//import { useAuth } from "./components/Context/AuthContext"
// import Login from "./components/Master/Login"
// import Register from "./components/Master/Register"
// import SectionBooks from "./components/acceuil/SectionBooks"
// import ContainerSubscription from "./components/abonement/ContainerSubscription"
// import BookDetails from "./components/book/BookDetails"
// import AuthorDetails from "./components/author/authorDetails"
// import Info from "./components/info"
// import Historique from "./components/historique"
// import CategoryDetails from "./components/Master/CategoryDetail"
// import AddBook from "./components/admin/AddBook"
// import Tableau from "./components/Table"
// import Footer from "./components/footer"
// import UserProfile from "./components/userProfil"
// import UserSettings from "./components/userSetting"
// import Home from "./components/acceuil2/Home"
// import PaymentSuccess from "./components/abonement/paymentsucces"
// import PaymentCancel from "./components/abonement/PaymentCancel"
// import ForgotPassword from "./components/login/ForgotPassword"
// import Dashboard from "./components/admin/Dashboard"




const App: React.FC = () => {
  const user = useAuthContext()
  console.log(user)
  const admin = user?.user? user?.user.role === true : false
  console.log(admin)
  return (
    <BrowserRouter>
 
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>}/>
        </Route>
        
        
        {admin?
        <Route path="/admin/*" element={<AdminRouter/>}/> 
        :
        <Route path="/admin/*" element={<NotFound/>}/>
         }
        
<Route path="/*" element={<UserRouter/>}/>
      </Routes>
    </BrowserRouter>



    //     <Route
    //       path="/admin/dashboard"
    //       element={
    //         <Layout
    //         >
    //           <Dashboard/>
    //         </Layout>
    //       }
    //     />
    //     <Route
    //       path="/admin/addbook"
    //       element={
    //         <Layout
    //         >
    //           <AddBook />
    //         </Layout>
    //       }
    //     />
    //     <Route
    //       path="/admin/tableau"
    //       element={
    //         <Layout
    //         >
    //           <Tableau />
    //         </Layout>
    //       }
    //     />

    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
