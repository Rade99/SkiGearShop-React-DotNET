import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

export default function RequireAuth() {
    const { user } = useAppSelector(state => state.account);

    
    if (!user) {
        return <Navigate to="/login"/>
    }

    return <Outlet />
}