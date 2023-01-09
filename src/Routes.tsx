import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UnauthorizedPage from './Pages/Unauthorized';
import LoginPage from './Pages/Login';
import RegisterUserPage from './Pages/RegisterUser';
import UserSettingsPage from './Pages/UserSettings';
import HomePage from './Pages/Home';
import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from './Pages/NotFound';
import LogoutPage from './Pages/Logout';


export default function ApplicationRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage />}/>
                <Route path="/logout" element={<LogoutPage/>}/>
                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="/register" element={<RegisterUserPage/>}/>
                

                <Route 
                    path="/drives" 
                    element={<PrivateRoute page={<HomePage />}/>}
                />
                <Route 
                    path="/settings" 
                    element={<PrivateRoute page={<UserSettingsPage />}/>}
                /> 
                
                
            </Routes>
        </BrowserRouter>   
    );
}