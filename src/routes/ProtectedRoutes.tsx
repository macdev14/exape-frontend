import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../common/context/authContext";


const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    const [signed, setSigned] = useState(true)
    useEffect(
        ()=>{
            isAuthenticated().then(e=>{
                // alert(e);
                setSigned(e)})
           
        }
    ,[])
    return (
        // <Outlet />
        signed ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes;


