import { changeUser } from "../../Redux/Reducers/UserSlice";
import store from "../../Redux/store";
import IService from "../interfaces/IService";
import useApi from "../useApi";


interface UserLoadingServiceReturn{
    uuid: string,
    email: string,
    name: string
}

export default class UserLoadingService implements IService<void, void>{
    async execute(): Promise<void> {
        
        const api = useApi();

        const { data: responseData } = await api.get('/user');

        let {
            email,
            name,
            uuid
        }: UserLoadingServiceReturn = responseData.data;

        store.dispatch(changeUser({
            email,
            name,
            uuid,
            isLogged: true
        }));
    }

}