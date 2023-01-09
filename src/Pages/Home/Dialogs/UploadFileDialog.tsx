import { useState, useEffect } from 'react';

import {
    Center,
    Stack,
    Box,
    Icon,
    Input,
    Button
} from '@chakra-ui/react';

import Dialog, { DialogProps } from '../../../Components/Dialog';
import { RiFileSearchFill } from 'react-icons/ri';
import InputDefault from '../../../Components/InputDefault';



export interface ResultUploadFileDialog{
    filename: string,
    file: File
}

export interface UploadFileDialogProps extends Omit<DialogProps, "title" | "children" | "size" | "onConfirm">{
    onConfirm: (params: ResultUploadFileDialog) => void
}


export default function UploadFileDialog({
    onCancel,
    onConfirm,
    open
}: UploadFileDialogProps){

    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [inputFileDisabled, setInputFileDisabled] = useState<boolean>(true);
    const [fileName, setFileName] = useState<string>("");

    useEffect(()=>{
        if(!open)
            clearStates();
    }, [open]);

    function handleClickConfirm(): void{
        if(!uploadFile) return;

        onConfirm({
            filename: fileName,
            file: uploadFile
        });
    }

    function clearStates(){
        setUploadFile(null);
        setFileName("");
    }
    
    return (
        <Dialog
                title='Upload de arquivos'
                onCancel={onCancel}
                onConfirm={handleClickConfirm}
                open={open}
        >
                <Stack
                    direction="row"
                    spacing={10}
                    align="center"
                >
                    <InputDefault 
                        size="lg"
                        placeholder='Nome do arquivo'
                        variant="filled"
                        value={fileName}
                        isDisabled={inputFileDisabled}
                        onBlur={({ target }) => {
                            setFileName(target.value);
                        }}
                    />
                    <Button
                        background="transparent"
                        color="primary"
                        _hover={{
                            color: "secondary"
                        }}
                        _active={{
                            color: "rgb(200, 200, 200)"
                        }}
                    >
                        <Icon
                            as={RiFileSearchFill}
                            height={10}
                            width="auto"
                            onClick={() => {
                                const inputFile = document.createElement('input');

                                inputFile.setAttribute("type", "file");

                                inputFile.addEventListener('input', ()=> {
                                    if(!inputFile.files) return;

                                    const [file]: FileList = inputFile.files;

                                    setUploadFile(file);
                                    setFileName(file.name);
                                    setInputFileDisabled(false);
                                });

                                inputFile.click();
                            }}
                        />
                    </Button>
                </Stack>
            </Dialog>
    );
}