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
    onClick: (data: T) => void
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
                <MenuButton
                    maxWidth={100}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    transition="all .3s"
                    cursor="pointer"
                    background={colorPrimary}
                    border="2px solid"
                    borderColor={colorSecondaryFileItemDefault}
                    padding={2}
                    transform={`scale(${scaleItem})`}
                    borderRadius={5}
                >
                    <Stack spacing={2} direction="column">
                        <Icon 
                            as={AiFillFile}
                            height={10}
                            width="auto"
                            color={colorSecondary}
                        />
                        <Text
                            color={colorSecondary}
                        >
                            {filename}
                        </Text>
                    </Stack>

                </MenuButton>
                <MenuList background={colorPrimary}>
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
                                {item.text}
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Menu>
    )
}