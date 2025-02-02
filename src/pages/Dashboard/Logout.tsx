import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
    const { logout } = useAuth();
    logout();
    return <Navigate to="/program_chair_login" />;
}    
