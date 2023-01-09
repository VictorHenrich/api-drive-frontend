import { Input, InputProps } from '@chakra-ui/react';




interface InputDefaultProps extends InputProps{
    colorPrimary?: string
} 



export default function InputDefault(props: InputDefaultProps){
    const { colorPrimary = "primary" } = props;

    return (
        <Input 
            variant="filled"
            _focus={{
                borderColor: colorPrimary
            }}
            {...props}
        />
    );
}