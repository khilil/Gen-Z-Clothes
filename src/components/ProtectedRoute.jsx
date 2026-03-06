import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
    const { user, role, loading } = useSelector((state) => state.auth);

    console.log("User:", user);
    console.log("Loading:", loading);
    console.log("Current URL:", window.location.href);

    if (loading) {
        return <div>Loading...</div>; // spinner muki sako
    }
    // 🚫 Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 🚫 Role mismatch
    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    // ✅ Allow access
    return children;
}