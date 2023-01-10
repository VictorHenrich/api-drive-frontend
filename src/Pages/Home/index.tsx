import { useState, useEffect } from 'react';

import {
    Center,
    Stack,
    Box,
    Icon,
    Card,
    CardBody,
    CardHeader,
    Heading
} from '@chakra-ui/react';

 import { 
        AiFillFileAdd, 
        AiOutlineCloudDownload, 
        AiOutlineEdit,
        AiOutlineDelete
} from "react-icons/ai";

import ContainerApp from "../../Components/ContainerApp";
import FileItem, { FileItemProps, MenuOption } from '../../Components/FileItem';
import FileUploadDialog, { ResultUploadFileDialog } from './Dialogs/FileUploadDialog';
import AlertDefault, { AlertDefaultProps } from '../../Components/AlertDefault';
import FileUploadService from '../../Services/Drive/FileUploadService';
import LoadingFilesService from '../../Services/Drive/LoadingFilesService';
import DownloadFileService from '../../Services/Drive/DownloadFileService';
import downloadFile from '../../Utils/downloadFile';
import FileExclusionService from '../../Services/Drive/FileExclusionService';
import FileUpdateDialog, { FileUpdatePayload } from './Dialogs/FileUpdateDialog';
import FileUpdateService from '../../Services/Drive/FileUpdateService';

interface PayloadFileApi{
    filename: string,
    uuid: string
}

export default function HomePage(props: any){
    const [openUploadFileDialog, setOpenUploadFileDialog] = useState<boolean>(false);
    const [openFileUpdateDialog, setOpenFileUpdateDialog] = useState<boolean>(false);
    const [itemUpdateSelected, setItemUpdateSelected] = useState<PayloadFileApi | null>(null);
    const [listFiles, setListFiles] = useState<Array<FileItemProps<PayloadFileApi>>>([]);
    const [alertData, setAlertData] = useState<Omit<AlertDefaultProps, "onClose">>({
        open: false,
        message: "",
        status: "success",
        title: "Alteração de perfil"
    });

    const optionsMenuFile: MenuOption<PayloadFileApi>[] = [
        {
            onClick: downloadFileSelected,
            text: "Baixar",
            icon: AiOutlineCloudDownload
        },
        {
            onClick: updateFileSelected,
            text: "Alterar",
            icon: AiOutlineEdit
        },
        {
            onClick: deleteFileSelected,
            text: "Excluir",
            icon: AiOutlineDelete
        }
    ]


    useEffect(()=>{
        loadFiles();
    },[])

    async function uploadFile({ file, filename }: ResultUploadFileDialog){
        try{
            const uploadFileService = new FileUploadService();

            const [, filetype ] = file.name.split('.');

            await uploadFileService.execute({ 
                filename,
                filetype,
                content: file 
            });

            await loadFiles();

            changeAlertData({ 
                open: true,
                message: "Arquivo carregado com sucesso!",
                status: "success"
            });

        }catch(error){
            changeAlertData({ 
                open: true,
                message: "Falha ao carregar arquivo!",
                status: "error"
            });
        }

        setOpenUploadFileDialog(false);
    }

    async function loadFiles(){
        const loadingFilesService = new LoadingFilesService();

        const files = await loadingFilesService.execute();

        setListFiles(
            files
                .map(data => {
                    return {
                        filename: data.filename,
                        data: data,
                        menuOptions: optionsMenuFile
                    }
                })
        );
    }

    async function downloadFileSelected({ filename, uuid }: PayloadFileApi){
        const downloadFileService = new DownloadFileService();

        let file: Blob = await downloadFileService.execute({ driveUUID: uuid });

        downloadFile(file, filename);
    }

    async function deleteFileSelected({ uuid: driveUUID }: PayloadFileApi){
        try{

            const fileExclusionService = new FileExclusionService();

            await fileExclusionService.execute({ driveUUID });
            
            await loadFiles();

            changeAlertData({ 
                open: true, 
                status: "success", 
                title: "Exclusão de arquivo!",
                message: "Arquivo excluído com sucesso!"
            });

        }catch(error){
            changeAlertData({ 
                open: true, 
                status: "warning", 
                title: "Exclusão de arquivo!",
                message: "Falha ao excluir arquivo!"
            });
        }
    }

    async function updateFile({ filename, uuid }: PayloadFileApi){
        try{
            const fileUpdateService = new FileUpdateService();

            await fileUpdateService.execute({ filename, driveUUID: uuid });

            await loadFiles();

            setOpenFileUpdateDialog(false);
            
            setItemUpdateSelected(null);

            changeAlertData({ 
                open: true, 
                status: "success", 
                title: "Alteração de arquivo!",
                message: "Arquivo alterado com sucesso!"
            });

        }catch(error){

            changeAlertData({ 
                open: true, 
                status: "warning", 
                title: "Alteração de arquivo!",
                message: "Falha ao alterar arquivo!"
            });
        }
    }

    function updateFileSelected(data: PayloadFileApi){
        let [filename]: string[] = data.filename.split('.');

        setItemUpdateSelected({ ...data, filename });
        
        setOpenFileUpdateDialog(true);
    }

    function changeAlertData(props: Partial<AlertDefaultProps>): void{
        setAlertData({ ...alertData, ...props });
    }

    return (
        <ContainerApp>
            <Center
                width="full"
                height="full"
                padding={5}
                position="relative"
            >   
                <Card
                    width="80%"
                    height="90%"
                    background="#FFFFFF"
                >
                    <CardHeader>
                        <Heading
                            color="primary"
                            size="lg"
                            textAlign="center"
                        >
                            Meus Arquivos
                        </Heading>
                    </CardHeader>
                    <CardBody overflowY="auto">
                        <Stack
                            width="full"
                            height="full"
                            direction="row"
                            spacing={10}
                            align="flex-start"
                            wrap="wrap"
                            justify="center"
                        >
                            {listFiles.map(item => {
                                return (
                                    <Box paddingBottom={10}>
                                        <FileItem
                                            data={item.data}   
                                            filename={item.filename}
                                            menuOptions={optionsMenuFile}
                                        />
                                    </Box>
                                );
                            })}
                            
                        </Stack>
                    </CardBody>
                </Card>
                <Center
                    position="absolute"
                    top={10}
                    right={10}
                    background="secondary"
                    padding={5}
                    borderRadius="50%"
                    boxShadow="0px 0px 5px 0px rgb(50, 50, 50)"
                    cursor="pointer"
                    onClick={() => {
                        setOpenUploadFileDialog(true);
                    }}
                >
                    <Icon 
                        as={AiFillFileAdd}
                        height={10}
                        width="auto"
                        color="#FFFFFF"
                    />
                </Center>
                <FileUploadDialog 
                    onCancel={() => {
                        setOpenUploadFileDialog(false);
                    }} 
                    onConfirm={uploadFile} 
                    open={openUploadFileDialog}
                />
                <FileUpdateDialog 
                    onCancel={() => setOpenFileUpdateDialog(false)} 
                    onConfirm={(data) => {
                        if(itemUpdateSelected)
                            updateFile({ ...itemUpdateSelected, ...data });
                    }} 
                    open={openFileUpdateDialog}
                    data={itemUpdateSelected}
                />
                <AlertDefault 
                    {...alertData}
                    onClose={() => changeAlertData({ open: false })}
                />
            </Center>
            
        </ContainerApp>
    );
}