import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import UserDisconnectService from "../../Services/User/UserDisconnectService";


export default function LogoutPage(){
    
    useEffect(() => {
        logout();
    }, [])

    function logout(){

        const userLogoutService = new UserDisconnectService();

        userLogoutService.execute();
    }

    return (
        <Navigate to="/"/>
    )
}