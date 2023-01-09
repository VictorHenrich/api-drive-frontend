import { Link } from 'react-router-dom';

import {
    Center,
    Image,
    Heading,
    Stack
} from '@chakra-ui/react';

import ImageInauthorized from "../../assets/Inauthorized.jpg";
import ButtonDefault from '../../Components/ButtonDefault';


export default function UnauthorizedPage(props: any){
    return (
        <Center
            width="100vw"
            height="100vh"
            boxSizing='border-box'
            padding={5}
        >   
            <Stack
                width="full"
                height="full"
                align="center"
                spacing={10}
            >
                <Heading
                    textAlign="center"
                    color="primary"
                    fontSize={35}
                >
                    Página não autorizada!
                </Heading>
                <Heading
                    textAlign="center"
                    color="secondary"
                    fontSize={30}
                >
                    Acesse a página de login para autenticação.
                </Heading>

                <Link to="/">
                    <ButtonDefault text='Acessar página de login'/>
                </Link>
                <Image 
                    src={ImageInauthorized}
                    height="auto"
                    width="40%"
                />
            </Stack>
        </Center>
    )
}