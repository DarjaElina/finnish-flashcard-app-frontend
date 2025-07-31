import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute() {
  const { data: user } = useAuth();
  if (user) return <Navigate to="/saved" replace />;

  return <Outlet />;
}
