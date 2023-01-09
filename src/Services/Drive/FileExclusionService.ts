import IService from "../interfaces/IService";
import useApi from "../useApi";


interface FileExclusionServiceProps{
    driveUUID: string
}


export default class FileExclusionService implements IService<FileExclusionServiceProps, void>{
    async execute({ driveUUID }: FileExclusionServiceProps): Promise<void> {
        const api = useApi();

        await api.delete(`/drive/${driveUUID}`);
    }
}