import {
    Center,
    Stack,
    Heading,
    Image
} from '@chakra-ui/react';

import BackgroundLogin from "../../assets/NotFound.jpg";



export default function NotFoundPage(){

    return (
        <Center
            width="100vw"
            height="100vh"
            padding={20}
            boxSizing="border-box"
        >
            <Stack
                width="full"
                height="full"
                spacing={20} 
                direction="column" 
                align="center"
            >
                <Heading 
                    color="secondary" 
                    fontSize={40}
                >
                    Página não encontrada
                </Heading>
                <Image 
                    src={BackgroundLogin}
                    height="80%"
                    width="auto"
                />
            </Stack>
        </Center>
    )
}