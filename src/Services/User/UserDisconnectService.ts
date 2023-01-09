import { logout } from "../../Redux/Reducers/UserSlice";
import store from "../../Redux/store";
import IService from "../interfaces/IService";



export default class UserDisconnectService implements IService<void, void>{
    execute(): void {
        store.dispatch(logout());

        localStorage.removeItem('token_user');
    }
}