import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from 'react'

const ProtectedRoute = () => {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

    useEffect(() => {
        if (!authUser && !isCheckingAuth) {
        checkAuth();
        }
    }, [authUser, isCheckingAuth, checkAuth]);

    if (isCheckingAuth) {
        return <div className="w-full h-[100vh] flex justify-center items-center bg-white"><p>Loading...</p></div>;
    }

    if (!authUser) {
        return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
    }

    // show protected pages
    return <Outlet />;
}

export default ProtectedRoute