import { ReactNode } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Stack
} from '@chakra-ui/react';
import ButtonDefault from '../ButtonDefault';


export interface DialogProps{
    title: string,
    children: ReactNode,
    onConfirm: () => void,
    onCancel: () => void,
    open: boolean,
    size?: string
}


export default function Dialog({
    title,
    children,
    onCancel,
    onConfirm,
    open,
    size = "3x1"
}: DialogProps){
    return (
        <Modal
            isOpen={open}
            onClose={() => null}
            size={"3xl"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Stack
                        direction="row"
                        spacing={5}
                    >
                        <ButtonDefault
                            text='Confirmar'
                            onClick={onConfirm}
                            colorPrimary="primary"
                        />
                        <ButtonDefault
                            text='Cancelar'
                            onClick={onCancel}
                            colorPrimary="red"
                        />
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}