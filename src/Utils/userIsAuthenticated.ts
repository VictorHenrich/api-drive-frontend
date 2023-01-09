import PayloadUserToken from "./interfaces/PayloadUserToken";




export default function userIsAutenticated(): boolean{
    let token: string | null = localStorage.getItem('token_user');

    if(!token) return false;

    let payloadJson: PayloadUserToken = JSON.parse(atob(token));

    if(!payloadJson.verify || Date.now() >= payloadJson.expired) return false;

    return true;
}