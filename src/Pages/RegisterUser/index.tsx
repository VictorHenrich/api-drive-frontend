import {
    Center,
    Flex,
    Image,
    Heading,
    Stack
} from "@chakra-ui/react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Background from "../../assets/BackgroundDefault.svg";
import ImageLogin from "../../assets/RegisterUser.jpg";
import ButtonDefault from "../../Components/ButtonDefault";
import InputDefault from "../../Components/InputDefault";
import UserCreateService from "../../Services/User/UserCreateService";


interface RegisterUserData{
    email: string,
    name: string,
    password: string,
    passwordConfirm: string
}


export default function RegisterUserPage(props: any){

    const navegate = useNavigate();

    const [userData, setUserData] = useState<RegisterUserData>({
        email: "",
        name: "",
        password: "",
        passwordConfirm: ""
    });

    async function submitForm(){
        const userCreateService = new UserCreateService();

        await userCreateService.execute({ ...userData });

        navegate('/register', { replace: true });
    }

    function changeState(props: Partial<RegisterUserData>){
        setUserData({ ...userData, ...props });
    }

    return (
        <Center
            width="100vw"
            height="100vh"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundImage={Background}
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
                    padding={10}
                >   
                    <Heading color="primary">
                        Faça parte da nossa equipe também!
                    </Heading>
                    <Stack
                        spacing={10}
                    >
                        <InputDefault 
                            type="text"
                            placeholder="Nome"
                            value={userData.name}
                            onChange={({ target }) => {
                                changeState({ name: target.value });
                            }}
                        />
                        <InputDefault 
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={({ target }) => {
                                changeState({ email: target.value });
                            }}
                            
                        />
                        <InputDefault 
                            type="password"
                            placeholder="Senha"
                            value={userData.password}
                            onChange={({ target }) => {
                                changeState({ password: target.value });
                            }}
                            
                        />
                        <InputDefault 
                            type="password"
                            placeholder="Confirmar senha"
                            value={userData.passwordConfirm}
                            onChange={({ target }) => {
                                changeState({ passwordConfirm: target.value });
                            }}
                        />
                    </Stack>
                    <ButtonDefault 
                        text="Cadastrar"
                        colorPrimary="secondary"
                        onClick={submitForm}
                    />
                </Flex>
            </Flex>
        </Center>
    );
}