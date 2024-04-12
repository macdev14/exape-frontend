import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../common/context/authContext";
import AuthRoutes from "./AuthRoutes";
import OtherRoutes from "./OtherRoutes";
import _ from "lodash";


const AppRoutes = () => {
    const {user, isAuthenticated } = useAuth();
    const [signed, setSigned] = useState(true)
    useEffect(
        ()=>{
           
            isAuthenticated().then(e=>{
                // alert(e)
                setSigned(e)})
           
        }
    ,[])
    return (
        // <Outlet />
        user !=null && !_.isEmpty(user) ? <OtherRoutes/> : <AuthRoutes/>
    )
}

export default AppRoutes;


