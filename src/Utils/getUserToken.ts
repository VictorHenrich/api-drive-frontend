import PayloadUserToken from "./interfaces/PayloadUserToken";




export default function getUserToken(): string | null {
    let payloadUserToken: string | null = localStorage.getItem('token_user');

    if(!payloadUserToken) return null;

    let { token }: PayloadUserToken = JSON.parse(atob(payloadUserToken));

    return token
}