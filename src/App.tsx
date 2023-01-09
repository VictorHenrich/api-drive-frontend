import { useEffect } from 'react';

import {
  ChakraProvider
} from '@chakra-ui/react';

import ApplicationRoutes from "./Routes";
import theme from './Themes/GlobalTheme';
import UserReconnectService from './Services/User/UserReconnectService';




export default function App() {
  const serviceSeconds: number = 60;

  setInterval(async () => {
    reconnectUser();

  }, 1000 * serviceSeconds);


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
