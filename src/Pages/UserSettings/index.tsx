import { useState, useEffect } from 'react';

import {
    Center,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Avatar,
    Stack,
} from '@chakra-ui/react';
import ButtonDefault from '../../Components/ButtonDefault';

import ContainerApp from "../../Components/ContainerApp";
import InputDefault from '../../Components/InputDefault';

import { useDispatch, useSelector } from 'react-redux';
import { StoreProps } from '../../Redux/store';
import { PayloadUser } from '../../Redux/Reducers/UserSlice';
import AlertDefault, { AlertDefaultProps } from '../../Components/AlertDefault';
import UserUpdateService from '../../Services/User/UserUpdateService';
import UserLoadingService from '../../Services/User/UserLoadingService';



interface SettingsDataProps{
    email: string,
    name: string,
    password: string,
    passwordConfirm: string
}


export default function UserSettingsPage(props: any){

    const dispath = useDispatch();
    let user: PayloadUser = useSelector<StoreProps, PayloadUser>(({ user })=> user);

    const [userData, setUserData] = useState<SettingsDataProps>({
        email: "",
        name: "",
        password: "",
        passwordConfirm: ""
    });

    const [alertData, setAlertData] = useState<Omit<AlertDefaultProps, "onClose">>({
        open: false,
        message: "",
        status: "success",
        title: "Alteração de perfil"
    });

    useEffect(() => {

        initStates();
    }, [user]);


    function initStates(): void{
        if(user){
            setUserData({
                email: user.email || "",
                name: user.name || "",
                password: "",
                passwordConfirm: ""
            });
        }
        
        changeAlertData({ open: false });
    }

    function changeAlertData(props: Partial<AlertDefaultProps>): void{
        setAlertData({ ...alertData, ...props });
    }

    async function loadUser(): Promise<void>{
        const userLoadingService = new UserLoadingService();

        await userLoadingService.execute();
    }

    async function submitForm(): Promise<void>{

       try{

        if(userData.password !== userData.passwordConfirm)
            throw new Error('Senhas estão diferentes!');

        const userUpdateService = new UserUpdateService();

        await userUpdateService.execute({ ...userData });

        changeAlertData({ 
            open: true,
            message: "Usuário foi alterado com sucesso!",
            status: "success"
        });

        await loadUser();
        
       }catch(error){
            changeAlertData({ 
                open: true,
                message: `Erro ao alterar usuário!`,
                status: "warning"
            });
       }
    }

    return (
        <ContainerApp>
            <Center
                width="full"
                height="full"
            >
                <Card
                    width="60%"
                    height="60%"
                    background="#FFFFFF"
                >
                    <CardHeader>
                        <Center>
                            <Avatar 
                                height={100}
                                width="auto"
                            />
                        </Center>
                    </CardHeader>
                    <CardBody>
                        <Center
                            width="full"
                            height="full"
                            padding={5}
                        >
                            <Stack 
                                direction="row"
                                spacing={10}
                                width="full"
                            >
                                <Stack 
                                    width="50%"
                                    spacing={10}
                                >
                                    <InputDefault 
                                        placeholder='Nome'
                                        value={userData.name}
                                        onChange={({ target }) => {
                                            setUserData({
                                                ...userData,
                                                name: target.value
                                            })
                                        }}
                                    />
                                    <InputDefault 
                                        placeholder='Nova Senha'
                                        value={userData.password}
                                        type="password"
                                        onChange={({ target }) => {
                                            setUserData({
                                                ...userData,
                                                password: target.value
                                            })
                                        }}
                                    />
                                </Stack>
                                <Stack
                                    width="50%"
                                    spacing={10}
                                >
                                    <InputDefault 
                                        placeholder='Email'
                                        type="email"
                                        value={userData.email}
                                        onChange={({ target }) => {
                                            setUserData({
                                                ...userData,
                                                email: target.value
                                            })
                                        }}
                                    />
                                    <InputDefault 
                                        placeholder='Confirmar nova senha'
                                        type="password"
                                        value={userData.passwordConfirm}
                                        onChange={({ target }) => {
                                            setUserData({
                                                ...userData,
                                                passwordConfirm: target.value
                                            })
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </Center>
                    </CardBody>
                    <CardFooter>    
                        <Center
                            width="full"
                            height="full"
                        >
                            <Stack
                                direction="row"
                                spacing={10}
                            >
                                <ButtonDefault 
                                    text='Confirmar'
                                    width={250}
                                    onClick={submitForm}
                                />
                                <ButtonDefault 
                                    text='Cancelar'
                                    colorPrimary='red'
                                    width={250}
                                />
                            </Stack>
                        </Center>
                    </CardFooter>
                </Card>
                <AlertDefault 
                    {...alertData}
                    onClose={() => changeAlertData({ open: false })}
                />
            </Center>
        </ContainerApp>
    );
}