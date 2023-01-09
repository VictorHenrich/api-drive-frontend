import IService from "../interfaces/IService";
import useApi from "../useApi";



interface UserUpdateServiceProps{
    email: string,
    name: string,
    password: string
}


export default class UserUpdateService implements IService<UserUpdateServiceProps, void>{
    async execute(param: UserUpdateServiceProps): Promise<void> {
        const api = useApi();

        await api.put('/user', param);
    }

}