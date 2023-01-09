import api from "../api";
import IService from "../interfaces/IService";



interface UserCreateServiceProps{
    name: string,
    email: string,
    password: string
}


export default class UserCreateService implements IService<UserCreateServiceProps, void>{
    async execute(param: UserCreateServiceProps): Promise<void> {
        await api.post('/user', param);
    }

}