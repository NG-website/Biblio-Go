import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../acceuil/Home";
import Register from "../register/Register";
import Login from "../login/Login";
import ForgotPassword from "../login/ForgotPassword";
import BookDetails from "../book/BookDetails";
import Info from "../aside/info";
import AuthorDetails from "../author/authorDetails";
import ContainerSubscription from "../abonement/ContainerSubscription";
import PaymentSuccess from "../abonement/PaymentSucces";
import PaymentCancel from "../abonement/PaymentCancel";

import CategoryDetails from "../books/BookCategoryDetail";
import Footer from "../aside/footer";
import UserProfile from "../user/userProfil";
import UserSettings from "../user/userSetting";
import NotFound from "./NotFound";
import Contact from "../aside/Contact"
import Like from "../aside/Like";
import userMiddleware from "./userMiddleware";
import UserMiddleware from "./userMiddleware";
import Historical from "../aside/historical";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="author/:id" element={<AuthorDetails />} />
        <Route path="info" element={<Info />} />
        <Route path="subscription" element={<ContainerSubscription />} />
        <Route path="contact" element={<Contact />} />
   <Route path=":cat" element={<CategoryDetails />} />
        <Route path="footer" element={<Footer />} />

        {/* <Route element={<UserMiddleware />}> */}
             <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
          <Route path="historical" element={<Historical />} />
          <Route path="like" element={<Like />} />
           <Route path="subscription/success" element={<PaymentSuccess />} />
        <Route path="subscription/cancel" element={<PaymentCancel />} />
        {/* </Route> */}

     

       

     

        <Route path="404" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default UserRouter;