import { PropsOptionsMenuDrawer } from '../Components/MenuDrawer';

import { 
    AiOutlineHome,
    AiOutlineUser
} from 'react-icons/ai';


import {
    BiLogOut
} from 'react-icons/bi';



export const optionsMenuDrawer: PropsOptionsMenuDrawer[] = [
    {
        description: "Inicio",
        icon: AiOutlineHome,
        link: "/drives",
        id: "home"
    },
    {
        description: "Conta",
        icon: AiOutlineUser,
        link: "/settings",
        id: "settings"
    },
    {
        description: "Sair",
        icon: BiLogOut,
        link: "/logout",
        id: "logout"
    }
]
