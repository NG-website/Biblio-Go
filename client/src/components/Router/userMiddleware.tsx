import { Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../Context/AuthContext";

function UserMiddleware() {

  const { user } = useAuth();
   console.log(user)
  //if (loading) return <p>Chargement...</p>;

  if (!user) return <Navigate to="/404" />;

  // ✅ Outlet affiche la route enfant
  return <Outlet />;
}

export default UserMiddleware;