import { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import Dialog, { DialogProps } from "../../../Components/Dialog";
import InputDefault from "../../../Components/InputDefault";


export interface FileUpdatePayload{
    filename: string
}


export interface FileUpdateDialogProps extends Omit<DialogProps, "title" | "children" | "size" | "onConfirm">{
    onConfirm: (params: FileUpdatePayload) => void,
    data?: FileUpdatePayload | null
}


const initStatesDefault: FileUpdatePayload = {
    filename: ""
}


export default function FileUpdateDialog({
    onConfirm,
    onCancel,
    open,
    data
}: FileUpdateDialogProps){

    const [dataFile, setDataFile] = useState<FileUpdatePayload>(initStatesDefault);

    useEffect(() =>{

        loadStates();

    }, [data]);

    useEffect(() =>{

        if(!open)
            resetStates();
            
    }, [open]);

    function changeDataFile(props: Partial<FileUpdatePayload>){
        setDataFile({ ...dataFile, ...props });
    }

    function loadStates(){
        if(!data) return;

        setDataFile({ ...data });
    }

    function resetStates(){
        setDataFile(initStatesDefault);
    }

    function onSubmit(){
        onConfirm({ ...dataFile });
    }

    return (
        <Dialog
            title="Atualização de arquivo"
            onCancel={onCancel}
            onConfirm={onSubmit}
            open={open}
        >

            <Stack spacing={20}>
                <InputDefault
                    placeholder="Nome do arquivo"
                    value={dataFile.filename}
                    onChange={({ target }) => {
                        changeDataFile({ filename: target.value });
                    }}
                />
            </Stack>
        </Dialog>
    )
}