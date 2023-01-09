import { useState, CSSProperties } from 'react';

import {
    Container,
    Box,
    IconButton,
    Flex,
} from "@chakra-ui/react";


import {
    AiOutlineMenu
} from "react-icons/ai";

import MenuDrawer from '../../Components/MenuDrawer';
import { optionsMenuDrawer } from '../../Contents/OptionsMenuDrawer';



interface IStyleDefaultComponents {
    containerTop: CSSProperties,
    containerBottom: CSSProperties,
    containerContent: CSSProperties
}

let styleDefaultComponents: IStyleDefaultComponents = {
    containerTop: {
        width: "100vw",
        height: "10vh"
    },
    containerBottom: {
        width: "100vw",
        height: "8vh"
    },
    containerContent: {
        height: "calc(100% - 18vh)",
        width: "100%"
    }
}


export default function ContainerApp(props: any){

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <Container
            minWidth="100vw"
            minHeight="100vh"
            position="relative"
            background="rgb(245, 245, 245)"
        >
            <MenuDrawer
                options={optionsMenuDrawer}
                isOpen={openMenu} 
                onClose={() => setOpenMenu(false)}
            />

            <Box
                position="absolute"
                top={0}
                left={0}
                zIndex={1}
                style={styleDefaultComponents.containerTop}
                backgroundColor="secondary"
                boxShadow="0px 0px 2px 2px rgb(200, 200, 200)"
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    minWidth={100}
                    maxWidth="5%"
                >
                    <IconButton
                        backgroundColor="#FFFFFF"
                        color="primary"
                        padding="10px 5px"
                        boxShadow="0px 5px 5px 0px rgb(90, 90, 90)"
                        borderRadius={10}
                        _hover={{
                            boxShadow:"0px 2px 2px 0px rgb(90, 90, 90)"
                        }}
                        aria-label='Search database'
                        icon={<AiOutlineMenu height={8} width="auto"/>}
                        onClick={() => setOpenMenu(true)}
                    />
                </Flex>
            </Box>
                <Box
                    position="absolute"
                    overflow="auto"
                    left={0}
                    zIndex={0}
                    top="10vh"
                    style={styleDefaultComponents.containerContent}
                >   

                    {props.children}
                </Box>

                <Box
                    zIndex={1}
                    position="absolute"
                    bottom={0}
                    left={0}
                    style={styleDefaultComponents.containerBottom}
                    background="lightGray"
                    boxShadow="0px 0px 3px 1px rgb(110, 110, 110)"
                >
                </Box>
        </Container>
    )
}