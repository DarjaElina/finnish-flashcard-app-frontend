import { Navigate, Outlet } from "react-router-dom";
import Moose from "./Moose/Moose";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { data: user, isError } = useAuth();

  if (isError) {
    return <Moose text="Error fetching user data 😢" />;
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
