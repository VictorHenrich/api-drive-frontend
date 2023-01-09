import fileToBase64 from "../../Utils/fileToBase64";
import IService from "../interfaces/IService";
import useApi from "../useApi";


interface UploadFileServiceProps{
    filename: string,
    content: File | Blob
}


export default class UploadFileService implements IService<UploadFileServiceProps, void>{
    async execute({ filename, content }: UploadFileServiceProps): Promise<void> {
        const api = useApi();

        const data = {
            filename,
            content: await fileToBase64(content)
        };

        await api.post('/drive', data);
    }    
}