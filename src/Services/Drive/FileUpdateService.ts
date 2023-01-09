import IService from "../interfaces/IService";
import useApi from "../useApi";


interface FileUpdateServiceProps{
    driveUUID: string,
    filename: string
}


export default class FileUpdateService implements IService<FileUpdateServiceProps, void>{
    async execute({
        driveUUID,
        filename
    }: FileUpdateServiceProps): Promise<void> {
        
        const api = useApi();

        const data = {
            filename
        }

        await api.put(`/drive/${driveUUID}`, data);
    }

}