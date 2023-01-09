import fileToBase64 from "../../Utils/fileToBase64";
import IService from "../interfaces/IService";
import useApi from "../useApi";


interface UploadFileServiceProps{
    filename: string,
    filetype: string,
    content: File | Blob
}


export default class FileUploadService implements IService<UploadFileServiceProps, void>{
    async execute({ filename, filetype, content }: UploadFileServiceProps): Promise<void> {
        const api = useApi();

        const data = {
            filename: `${filename}.${filetype}`,
            content: await fileToBase64(content)
        };

        await api.post('/drive', data);
    }    
}