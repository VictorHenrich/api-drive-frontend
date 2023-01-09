import { extendTheme } from "@chakra-ui/react";
import { colorsTheme } from "./ColorsTheme";
import { resetTheme } from "./ResetTheme";



const theme = extendTheme({
    styles:{
        global: {
            ...resetTheme
        },

    },
    ...colorsTheme,
});


export default theme;