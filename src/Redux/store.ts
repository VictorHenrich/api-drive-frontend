import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { PayloadUser } from './Reducers/UserSlice';
import MenuReducer, { PayloadMenu } from './Reducers/MenuSlice';


export interface StoreProps{
    user: PayloadUser,
    menuList: PayloadMenu
}

const store = configureStore({
    reducer: {
        user: UserReducer,
        menuList: MenuReducer
    }
});


export default store;