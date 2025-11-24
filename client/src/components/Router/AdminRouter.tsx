import { Routes, Route } from "react-router-dom";
//import AdminLayout from "../components/Master/AdminLayout";
// import Dashboard from "../admin/Dashboard";
import Layout from "../layout/Layout";
// import AddBook from "../admin/book/AddBook";
// import Tableau from "../admin/Table";
// import AdminBook from "../admin/stripe/Stripe";
// import AdminNavBar from "../admin/AdminNavBar";
// import BookDetails from "../book/BookDetails";
// import AddUser from "../admin/user/AddUser";
import ListUser from "../admin/user/ListUser";
import UserDetails from "../admin/user/UserDetails";
import SearchUser from "../admin/user/SearchUser";
// import AddAuthor from "../admin/author/AddAuthor";
import ListAuthor from "../admin/author/ListAuthor";
//  import AuthorDetails from "../author/AuthorDetails";
import ListBook from "../admin/book/ListBook";
import UserBook from "../admin/users_books/UserBook";
import Stripe from "../admin/stripe/Stripe";
// import AddBook from "../components/admin/AddBook";
// import Tableau from "../components/admin/Tableau";
//import ProtectedRoute from "./ProtectedRoute";

const AdminRouter = () => {
  return (
    <Routes>
      {/* <Route
        element={
         <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      > */}
      <Route element={<Layout />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="book" element={<ListBook />} />
        {/* <Route path="book/create" element={<AddBook />} /> */}
        <Route path="author" element={<ListAuthor />} />
        {/* <Route path="author/create" element={<AddAuthor />} /> */}
        {/* <Route path="author/details/:id" element={<AuthorDetails />} /> */}
        <Route path="user" element={<ListUser />} />
        {/* <Route path="user/create" element={<AddUser />} /> */}
        <Route path="user/search" element={<SearchUser />} />
        <Route path="user/details/:id" element={<UserDetails />} />
        <Route path="/stripe" element={<Stripe />} />
        {/* <Route path="book/:id" element={<BookDetails />} /> */}
        <Route path="userbook/take" element={<UserBook filter={'take'} />} />
        <Route path="userbook/deposit" element={<UserBook filter={'deposit'}/>} />
      </Route>

    </Routes>
  );
};

export default AdminRouter;
