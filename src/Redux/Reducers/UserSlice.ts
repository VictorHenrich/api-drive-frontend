import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface PayloadUser{
    uuid: string | null
    email: string | null,
    name: string | null,
    isLogged: boolean
}

const initStateUser: PayloadUser = {
    email: null,
    name: null,
    uuid: null,
    isLogged: false
}


const userSlice = createSlice({
    name: "userSlice",
    initialState: initStateUser,
    reducers:{
        changeUser: (state: PayloadUser, { payload }: PayloadAction<PayloadUser>) => {
            return { ...state, ...payload };
        },
        login: (state: PayloadUser, { payload }: PayloadAction<Pick<PayloadUser, "email" | "name" | "uuid" >>) => {
            return { ...state, ...payload, isLogged: true };
        },
        logout: (state: PayloadUser) => {
            return initStateUser;
        }
    }
});


export default userSlice.reducer;

export const { login, logout, changeUser } = userSlice.actions