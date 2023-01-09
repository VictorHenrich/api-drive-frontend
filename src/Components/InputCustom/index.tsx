import {useState, useEffect } from 'react';

import {
    Flex,
    Input,
    Icon,
    InputProps,
    FlexProps
} from '@chakra-ui/react';



const colorDefault: string = "black";
const backgroundColorDefault: string = "transparent";

const colorFocusPrimary: string = "primary";
const colorFocusSecondary: string = "secondary"


interface PropsColor{
    focus?:{
        primary: string,
        secondary: string
    },
    default?: string
}

interface PropsInput{
    icon: any,
    colors?: PropsColor,
    inputProps?: Omit<InputProps, "onBlur" | "onFocus">,
    containerInputProps?: FlexProps
}


export default function InputCustom(props: PropsInput){
    const [styleInput, setStyleInput] = useState({
        colorBorder: colorDefault,
        colorFont: colorDefault,
        colorBackground: backgroundColorDefault
    });


    useEffect(()=>{
        if(props.colors){
            let colorDefault_: string = getDefaultColor();

            setStyleInput({
                colorBorder: colorDefault_,
                colorFont: colorDefault_,
                colorBackground: backgroundColorDefault
            });
        }
    },[]);


    function getFocusColor(): [string, string]{
        let colorPrimary: string = colorFocusPrimary
        let colorSecondary: string = colorFocusSecondary;

        if(props.colors && props.colors.focus){
            if(props.colors.focus.primary)
                colorPrimary = props.colors.focus.primary;

            if(props.colors.focus.secondary)
                colorSecondary = props.colors.focus.secondary;
        }

        return [
            colorPrimary,
            colorSecondary
        ];
    }

    function getDefaultColor(): string{
        let colorDefault_: string = colorDefault;

        if(props.colors?.default)
            colorDefault_ = props.colors.default;

        return colorDefault_;
    }

    return (
        <Flex
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            width="full"
            border={`2px solid ${styleInput.colorBorder}`}
            padding={2}
            borderRadius={10}
            backgroundColor={styleInput.colorBackground}
            transition="background 0.3s"
            {...props?.containerInputProps}
        >
            <Input
                maxWidth="calc(100% - 50px)"
                minWidth={150}
                backgroundColor="transparent"
                color={styleInput.colorFont}
                fontWeight="bolder"
                border="none"
                fontSize={18}
                _focusVisible={{
                    border: "none"
                }}
                onFocus={(event) => {
                    let [colorPrimary, colorSecondary] = getFocusColor();

                    setStyleInput({
                        colorBackground: colorSecondary,
                        colorFont: colorPrimary,
                        colorBorder: "transparent"
                    });
                }}

                onBlur={(event)=> {
                    let colorDefault_: string = getDefaultColor();

                    setStyleInput({
                        colorBackground: backgroundColorDefault,
                        colorFont: colorDefault_,
                        colorBorder: colorDefault_
                    });
                }}

                {...props.inputProps}
            />
            <Icon
                transition="all 0.3s"
                color={styleInput.colorFont}
                width="40px"
                height="auto"
                as={props.icon}
            />
        </Flex>
    )
}