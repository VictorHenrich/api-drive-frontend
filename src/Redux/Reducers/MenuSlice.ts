import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropsOptionsMenuDrawer } from '../../Components/MenuDrawer';
import { optionsMenuDrawer } from '../../Contents/OptionsMenuDrawer';


export interface MenuItemSelected{
    item: PropsOptionsMenuDrawer
}

export interface PayloadMenu{
    menuList: PropsOptionsMenuDrawer[],
    itemSelected: MenuItemSelected | null
}


const initStateMenu: PayloadMenu = {
    menuList: optionsMenuDrawer,
    itemSelected: null
}

const menuSlice = createSlice({
    name: "menuSlice",
    initialState: initStateMenu,
    reducers: {
        changeList: (state: PayloadMenu, { payload }: PayloadAction<PropsOptionsMenuDrawer[]>) => {
            return { ...state, menuList: payload };
        },

        changeSelectedItem: (state: PayloadMenu, { payload }: PayloadAction<MenuItemSelected>) => {
            return { ...state, itemSelected: payload };
        },

        changeRoute: (state: PayloadMenu, { payload }: PayloadAction<string>) => {
            
            const itemLocated: PropsOptionsMenuDrawer | undefined = state.menuList.find(item => item.link === payload);

            if(!itemLocated) return {...state};

            else
                return {
                    ...state,
                    itemSelected: {
                        item: itemLocated
                    }
                }
        },
    }
});

export const { changeList, changeSelectedItem, changeRoute } = menuSlice.actions;

export default menuSlice.reducer;

