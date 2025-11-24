import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function AdminMiddleware() {

  const { user, isAdmin } = useAuth();
   console.log(user)
  //if (loading) return <p>Chargement...</p>;
    if(user && isAdmin === 'admin'){
        return
    }
  if (!user) return <Navigate to="/404" />;

  // ✅ Outlet affiche la route enfant
  return <Outlet />;
}

export default AdminMiddleware;