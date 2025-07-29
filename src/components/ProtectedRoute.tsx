import { Navigate, Outlet } from "react-router-dom";
import Moose from "./Moose";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { data: user, isError, isLoading } = useAuth();

  if (isLoading) {
    return <Moose text="Fetching your data.." />;
  }

  if (isError) {
    return <Moose text="Error fetching user data 😢" />;
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
