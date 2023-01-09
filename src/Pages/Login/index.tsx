import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    Center,
    Flex,
    Image,
    Heading,
    Stack,
    Link,
    Button,
} from "@chakra-ui/react";

import {
    AiOutlineMail,
    AiFillLock
} from 'react-icons/ai';

import BackgroundLogin from "../../assets/BackgroundDefault.svg";
import ImageLogin from "../../assets/Login.jpg";
import InputCustom from "../../Components/InputCustom";
import ButtonDefault from '../../Components/ButtonDefault';
import { changeRoute } from '../../Redux/Reducers/MenuSlice';
import UserConnectService from '../../Services/User/UserConnectService';

interface LoginProps{
    email: string,
    password: string
}


export default function LoginPage(props: any){
    const dispath = useDispatch();
    const navegate = useNavigate();

    let [loginData, setLoginData] = useState<LoginProps>({
        email: "",
        password: ""
    });


    function changeLoginData(props: Partial<LoginProps>){
        setLoginData({ ...loginData, ...props });
    }

    async function submitForm(){
        const userConnectService = new UserConnectService();

        await userConnectService.execute({ ...loginData });

        dispath(changeRoute('/drives'));
        
        navegate("/drives");
    }

    return (
        <Center
            width="100vw"
            height="100vh"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundImage={BackgroundLogin}
        >
            <Flex
                width="70%"
                height="70%"
                background="#FFFFFF"
                borderRadius="10px"
                overflow="hidden"
            >
                <Center
                    width="50%"
                    height="100%"
                >
                    <Image src={ImageLogin}/>
                </Center>
                <Flex
                    width="50%"
                    height="100%"
                    flexDirection="column"
                    justifyContent="space-around"
                    boxSizing="border-box"
                    padding="5px 20px"
                >   
                    <Stack
                        spacing={5}
                    >
                        <Heading
                            as="h1"
                            color="primary"
                            fontSize={30}
                        >
                            Sua segurança é totalmente segura conosco!
                        </Heading>
                        <Heading
                            as="h2"
                            color="secondary"
                            fontSize={25}
                            fontWeight={500}
                        >
                            Acesse nossa plataforma e confira já!
                        </Heading>
                    </Stack>
                    <Stack
                        spacing={5}
                    >
                        <InputCustom
                            colors={{
                                default: "#2B6CB0",
                                focus: {
                                    primary: "#FFFFFF",
                                    secondary: "secondary"
                                }
                            }}
                            inputProps={{
                                type: "email",
                                onChange: ({ target }) => {
                                    changeLoginData({ email: target.value });
                                }
                            }}
                            icon={AiOutlineMail}
                        />
                        

                        <Stack spacing={2}>
                        <InputCustom 
                            icon={AiFillLock} 
                            colors={{
                                default: "#2B6CB0",
                                focus: {
                                    primary: "#FFFFFF",
                                    secondary: "secondary"
                                }
                            }}
                            inputProps={{
                                type: "password",
                                onChange: ({ target }) => {
                                    changeLoginData({ password: target.value });
                                }
                            }}
                        />
                            <Link 
                                color="primary"
                                textAlign="right"
                            >
                                    Esqueci minha senha
                            </Link>
                        </Stack>
                        
                    </Stack>

                    <Stack
                        justify="space-between"
                        align="center"
                        direction="row"
                    >
                        <RouterLink
                            to="/register"
                        >
                            <Button
                                background="transparent"
                                color="secondary"
                                boxSizing="border-box"
                                border="2px solid transparent"
                                transition="all .3s"
                                _hover={{
                                    borderColor: "secondary"
                                }}
                            >
                                Criar conta
                            </Button>
                        </RouterLink>
                        <ButtonDefault text='Logar' minWidth={200} onClick={submitForm}/>
                    </Stack>
                </Flex>
            </Flex>
        </Center>
    );
}