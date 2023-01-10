import { useState, SetStateAction } from 'react';

import {
    Stack,
    Icon,
    Text,
    Menu,
    MenuList,
    MenuItem,
    MenuButton
} from '@chakra-ui/react';

import { AiFillFile } from 'react-icons/ai';



export interface FileItemProps<T>{
    data: T,
    filename: string
    menuOptions: MenuOption<T>[]
}

export interface MenuOption<T>{
    text: string,
    onClick: (data: T) => void,
    icon: any
}

const scaleFileItemDefault: number = 1;
const scaleFileItemOpen: number = 1.2;

const colorPrimaryFileItemDefault: string = "#FFFFFF";
const colorPrimaryFileItemOpen: string = "primary";

const colorSecondaryFileItemDefault: string = "primary";
const colorSecondaryFileItemOpen: string = "#FFFFFF";


export default function FileItem({
    data,
    filename,
    menuOptions
}: FileItemProps<any>){

    const [scaleItem, setScaleItem] = useState(scaleFileItemDefault);
    const [colorSecondary, setColorSecondary] = useState(colorSecondaryFileItemDefault);
    const [colorPrimary, setColorPrimary] = useState(colorPrimaryFileItemDefault);

    return (
        <Menu
            onOpen={() => {
                setScaleItem(scaleFileItemOpen);
                setColorSecondary(colorSecondaryFileItemOpen);
                setColorPrimary(colorPrimaryFileItemOpen);
            }}
            onClose={() => {
                setScaleItem(scaleFileItemDefault);
                setColorSecondary(colorSecondaryFileItemDefault);
                setColorPrimary(colorPrimaryFileItemDefault);
            }}
        >
                <MenuButton>
                    <Stack
                        minWidth={100}
                        maxWidth={250}
                        spacing={2} 
                        direction="column"
                        whiteSpace="pre-wrap"
                        transition="all .3s"
                        cursor="pointer"
                        background={colorPrimary}
                        border="1.5px solid rgb(200, 200, 200)"
                        padding={2}
                        transform={`scale(${scaleItem})`}
                        borderRadius={5}
                    >
                        <Icon 
                            as={AiFillFile}
                            height={10}
                            width="auto"
                            color={colorSecondary}
                        />
                        <Text
                            color={colorSecondary}
                            fontWeight={550}
                        >
                            {filename}
                        </Text>
                    </Stack>

                </MenuButton>
                <MenuList background={colorPrimary} marginTop={2}>
                    {menuOptions.map(item => {

                        return (
                            <MenuItem 
                                background={colorPrimary}
                                onClick={() => item.onClick(data)}
                                color="#FFFFFF"
                                _hover={{
                                    background: "#FFFFFF",
                                    color: colorPrimary
                                }}
                                borderBottom="1px solid"
                                borderColor={"rgba(255, 255, 255, 0.5)"}
                            >
                                <Stack
                                    minWidth={200}
                                    direction="row"
                                    spacing={5}
                                    align="center"
                                    justify="space-between"
                                >
                                    <Text>
                                        {item.text}
                                    </Text>
                                    <Icon 
                                        as={item.icon}
                                        height={7}
                                        width="auto"
                                    />
                                </Stack>
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Menu>
    )
}