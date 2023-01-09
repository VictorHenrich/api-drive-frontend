import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import {
    Center,
    Drawer,
    DrawerContent,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    List,
    ListItem,
    ListIcon,
    Flex,
    Avatar,
    Text,
    Stack,
    Divider,
    DrawerProps
} from "@chakra-ui/react";
import { PayloadUser } from "../../Redux/Reducers/UserSlice";
import { PayloadMenu, changeSelectedItem } from "../../Redux/Reducers/MenuSlice";
import { StoreProps } from "../../Redux/store";



export interface PropsOptionsMenuDrawer{
    description: string,
    icon?: any,
    link: string,
    id: string,
    handle?: () => void
}

export interface PropsMenuDrawer extends Pick<DrawerProps, "isOpen" | "onClose">{
    options: PropsOptionsMenuDrawer[]
}


export default function MenuDrawer(props: PropsMenuDrawer){
    const dispath = useDispatch();
    let payloadUser: PayloadUser = useSelector<StoreProps, PayloadUser>(({ user }) => user);
    let payloadMenuList: PayloadMenu = useSelector<StoreProps, PayloadMenu>(({ menuList }) => menuList);

    let [name, setName] = useState<string>("");
    let [email, setEmail] = useState<string>("");
    let [menuList, setMenuList] = useState<PropsOptionsMenuDrawer[]>([]);
    let [menuItemSelected, setMenuItemSelected] = useState<PropsOptionsMenuDrawer | null>(null);

    useEffect(()=>{

        initStatesUser();
        initStatesMenuList();
    }, [payloadUser, payloadMenuList]);

    function initStatesUser(): void{
        if(!payloadUser) return;

        setName(payloadUser.name || "");
        setEmail(payloadUser.email || "");
    }

    function initStatesMenuList(): void{
        if(!payloadMenuList) return;

        setMenuList(payloadMenuList.menuList);

        if(payloadMenuList.itemSelected)
            setMenuItemSelected(payloadMenuList.itemSelected.item);
    }

    function handleClickMenuItem(item: PropsOptionsMenuDrawer): void{
        dispath(changeSelectedItem({ item }));

        if(item.handle)
            item.handle();
    }

    return (
        <Drawer 
            {...props}
            size="xs" 
            placement="left"
        >
                <DrawerOverlay />
                <DrawerContent
                    maxWidth={400}
                    width={400}
                    background="#FFFFFF"
                >
                    <DrawerHeader>
                        <Flex
                            height="10vh"
                            
                            flexDirection="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Avatar
                                height={20}
                                width="auto"
                                background="black"
                            />
                            <Stack
                                direction="column"
                                spacing={1.5}
                            >
                                <Text
                                    fontSize={20}
                                    fontWeight="bold"
                                    color="primary"
                                    fontFamily="'Open Sans', sans-serif"
                                >
                                    {name.toLocaleUpperCase()}
                                </Text>
                                <Text
                                    color="rgb(150, 150, 150)"
                                    fontSize={15}
                                    fontFamily="'Open Sans', sans-serif"
                                >
                                    {email}
                                </Text>
                            </Stack>
                        </Flex>
                        <Divider />
                    </DrawerHeader>
                    <DrawerBody>
                        <Center
                            boxSizing='border-box'
                            padding={5}
                        >
                            <List
                                width="100%"
                            >
                                {menuList.map(item => {
                                    let color: string = "primary";
                                    let background: string = "transparent";

                                    if(menuItemSelected && menuItemSelected.id === item.id){
                                        color = "#FFFFFF";
                                        background = "rgb(200, 200, 200)";
                                    }

                                    return (
                                        <Link to={item.link}>
                                            <ListItem
                                                fontFamily="'Roboto', sans-serif"
                                                display="flex"
                                                flexDirection="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                color={color}
                                                margin="10px 0px"
                                                padding={2}
                                                fontSize={20}
                                                cursor="pointer"
                                                borderRadius={10}
                                                background={background}
                                                transition="all .2s"
                                                onClick={() => handleClickMenuItem(item)}
                                                _hover={{
                                                    boxShadow:"0px 1px 3px 0px rgb(200,200,200)",
                                                    backgroundColor: "secondary",
                                                    color: "#FFFFFF"
                                                }}
                                            >
                                                {item.icon && (
                                                    
                                                        <ListIcon
                                                            as={item.icon}
                                                            height={10}
                                                            width="auto"
                                                            paddingRight={2}
                                                        />
                                                )}
                                                {item.description}
                                                
                                            </ListItem>
                                        </Link>
                                    )
                                })}
                            </List>
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
    )
}