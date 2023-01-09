import { useState, useEffect } from 'react';

import {
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    Drawer,
    DrawerContent,
    Center
} from '@chakra-ui/react';


export type AlertStatus = "loading" | "info" | "warning" | "success" | "error";

export interface AlertDefaultProps{
    title?: string,
    message: string,
    status: AlertStatus,
    open: boolean,
    seconds?: number,
    onClose: () => void
}



export default function AlertDefault({
    title,
    message,
    open,
    status,
    seconds = 1,
    onClose = ()=> null
}: AlertDefaultProps){

    useEffect(()=>{
        handleAlert();
    }, [open]);

    function handleAlert(): void{
        if(!open) return;

        const realTime: number = 1000 * seconds;

        setTimeout(() => {
            onClose();
        }, realTime);
    }

    return (
        <Drawer
            isOpen={open}
            placement="bottom"
            onClose={onClose}
        >
            <DrawerContent background="transparent">
                <Center marginBottom="60vh">
                    <Alert
                        status={status}
                        width="50vw"
                        minHeight={200}
                        flexDirection="column"
                        justifyContent="space-evenly"
                    >
                        <AlertIcon />
                        <AlertTitle
                            fontSize={25}
                        >
                            {title}
                        </AlertTitle>
                        <AlertDescription>
                            {message}
                        </AlertDescription>
                    </Alert>
                </Center>
            </DrawerContent>
        </Drawer>
    );
}