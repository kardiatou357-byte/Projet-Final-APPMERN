import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, admin }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}