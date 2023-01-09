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

 import { AiFillFileAdd } from "react-icons/ai";

import ContainerApp from "../../Components/ContainerApp";
import FileItem, { FileItemProps, MenuOption } from '../../Components/FileItem';
import UploadFileDialog, { ResultUploadFileDialog } from './Dialogs/UploadFileDialog';
import AlertDefault, { AlertDefaultProps } from '../../Components/AlertDefault';
import UploadFileService from '../../Services/Drive/UploadFileService';
import LoadingFilesService from '../../Services/Drive/LoadingFilesService';
import DownloadFileService from '../../Services/Drive/DownloadFileService';
import downloadFile from '../../Utils/downloadFile';

interface PayloadFileApi{
    filename: string,
    uuid: string
}


export default function HomePage(props: any){
    const [openUploadFileDialog, setOpenUploadFileDialog] = useState<boolean>(false);
    const [listFiles, setListFiles] = useState<Array<FileItemProps<PayloadFileApi>>>([]);
    const [alertData, setAlertData] = useState<Omit<AlertDefaultProps, "onClose">>({
        open: false,
        message: "",
        status: "success",
        title: "Alteração de perfil"
    });

    const optionsMenuFile: MenuOption<PayloadFileApi>[] = [
        {
            onClick: () => null,
            text: "Alterar"
        },
        {
            onClick: () => null,
            text: "Excluir"
        },
        {
            onClick: loadFile,
            text: "Baixar"
        }
    ]


    useEffect(()=>{
        loadFiles();
    },[])

    async function uploadFile({ file, filename }: ResultUploadFileDialog){
        try{
            const uploadFileService = new UploadFileService();

            await uploadFileService.execute({ filename, content: file });

            changeAlertData({ 
                open: true,
                message: "Arquivo carregado com sucesso!",
                status: "success"
            });

            await loadFiles();

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

    async function loadFile({ filename, uuid }: PayloadFileApi){
        const downloadFileService = new DownloadFileService();

        let file: Blob = await downloadFileService.execute({ driveUUID: uuid });

        downloadFile(file, filename);
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
                <UploadFileDialog 
                    onCancel={() => {
                        setOpenUploadFileDialog(false);
                    }} 
                    onConfirm={uploadFile} 
                    open={openUploadFileDialog}
                />
                <AlertDefault 
                    {...alertData}
                    onClose={() => changeAlertData({ open: false })}
                />
            </Center>
            
        </ContainerApp>
    );
}