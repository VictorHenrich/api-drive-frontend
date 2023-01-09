import IService from "../interfaces/IService";
import useApi from "../useApi";



interface LoadingFilesServiceReturn{
    filename: string,
    uuid: string
}



export default class LoadingFilesService implements IService<void, LoadingFilesServiceReturn[]>{
    async execute(): Promise<LoadingFilesServiceReturn[]> {
        const api = useApi();
        
        const { data } = await api.get('/drive');

        let loadingFilesReturn: LoadingFilesServiceReturn[] = data.data;
        
        return loadingFilesReturn;
    }
    
}