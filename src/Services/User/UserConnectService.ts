import { login } from "../../Redux/Reducers/UserSlice";
import store from "../../Redux/store";
import PayloadUserToken from "../../Utils/interfaces/PayloadUserToken";
import api from "../api";
import IService from "../interfaces/IService";


interface UserConnectProps{
    email: string,
    password: string
}


export default class UserConnectService implements IService<UserConnectProps, void>{
    static get expiredSeconds(): number{
        return 300;
    }

    async execute(param: UserConnectProps): Promise<void> {
        const {
            data: tokenData
        } = await api.post('/auth', param);

        const { data: token } = tokenData;

        const  {
            data: { data: userData }
        } = 
            await api
                    .get(
                        '/user', 
                        { 
                            headers: { 
                                "Authorization": token 
                            }
                        }
                    );

        const {
            uuid,
            email,
            name
        } = userData;

        let payloadUserToken: PayloadUserToken = {
            expired: Date.now() + (1000 * UserConnectService.expiredSeconds),
            token,
            verify: true
        };

        localStorage.setItem(
            'token_user', 
            btoa(JSON.stringify(payloadUserToken))
        );


        store.dispatch(login({ 
            email,
            name,
            uuid
        }));
    }
}