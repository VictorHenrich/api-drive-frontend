import IService from "../interfaces/IService";
import getUserToken from '../../Utils/getUserToken';
import api from "../api";
import PayloadUserToken from "../../Utils/interfaces/PayloadUserToken";
import UserLoadingService from "./UserLoadingService";
import UserDisconnectService from "./UserDisconnectService";


export default class UserReconnectService implements IService<void, void>{

    static get expiredSeconds(): number{
        return 300;
    }

    async execute(): Promise<void> {
        try{
            let token: string | null = getUserToken();

            if(!token)
                throw new Error('Token is invalid!');

            const data = { token };

            const { data: responseData } = await api.put('/auth', data);

            let refreshToken: string = responseData.data;

            let payloadUserToken: PayloadUserToken = {
                expired: Date.now() + (1000 * UserReconnectService.expiredSeconds),
                token: refreshToken,
                verify: true
            };

            localStorage.setItem(
                'token_user', 
                btoa(JSON.stringify(payloadUserToken))
            );

            const userLoadingService = new UserLoadingService();

            await userLoadingService.execute();

        }catch(error){
            const userDisconnectService = new UserDisconnectService();

            userDisconnectService.execute();
        }
    }

}