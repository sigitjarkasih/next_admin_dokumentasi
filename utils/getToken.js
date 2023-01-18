import Cookies from "universal-cookie";

export default function GetToken(){
    const cookies = new Cookies;
    const token = cookies.get("TOKEN");
    return token;
}