import { Navigate } from 'react-router-dom';
import userIsAutenticated from '../../Utils/userIsAuthenticated';


interface PrivateRouteProps{
    redirectTo?: string
    page: JSX.Element
}


export default function PrivateRoute({ page, redirectTo = "/unauthorized" }: PrivateRouteProps){
    return (
        userIsAutenticated()
            ? page
            : <Navigate to={redirectTo}/>
    );
}