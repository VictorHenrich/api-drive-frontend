import {
    Button,
    ButtonProps
} from '@chakra-ui/react';


interface ButtonCustomProps extends ButtonProps{
    text: string,
    colorPrimary?: string,
    colorSecondary?: string
}

export default function ButtonDefault(props: ButtonCustomProps){
    const {
        text,
        colorPrimary = "primary",
        colorSecondary = "#FFFFFF"
    } = props;

    return (
        <Button
            background={colorPrimary}
            color={colorSecondary}
            border="2px solid"
            borderColor={colorSecondary}
            _hover={{
                color:colorPrimary,
                background: colorSecondary,
                borderColor: colorPrimary
            }}
            {...props}
        >
            {text}
        </Button>
    )
}