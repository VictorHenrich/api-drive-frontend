import IService from "../interfaces/IService";
import useApi from "../useApi";

interface DownloadFileServiceProps{
    driveUUID: string
}


export default class DownloadFileService implements IService<DownloadFileServiceProps, Blob>{
    async execute({ driveUUID }: DownloadFileServiceProps): Promise<Blob> {
        const api = useApi();

        const { data } = await api.get(`/drive/${driveUUID}`, { responseType: "blob" });

        return data;
    }

}