import { useEffect } from 'react';

import {
  ChakraProvider
} from '@chakra-ui/react';

import ApplicationRoutes from "./Routes";
import theme from './Themes/GlobalTheme';
import UserReconnectService from './Services/User/UserReconnectService';
import { useSelector } from 'react-redux';
import { StoreProps } from './Redux/store';
import { PayloadUser } from './Redux/Reducers/UserSlice';




export default function App() {
  let user: PayloadUser = useSelector<StoreProps, PayloadUser>(({ user }) => user);

  const serviceSeconds: number = 60;

  useEffect(() =>{
    if(!user.isLogged) return;

    setInterval(async () => {
      reconnectUser();

    }, 1000 * serviceSeconds);

  }, [user]);


  useEffect(() => {
    reconnectUser();
  }, []);


  async function reconnectUser(){
    const userReconnectService = new UserReconnectService();

    await userReconnectService.execute();
  }

  return (
    <ChakraProvider 
      theme={theme}
    >
      <ApplicationRoutes />
    </ChakraProvider>
  )
};
