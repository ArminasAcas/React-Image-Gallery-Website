import Form from "./FormComponent"
import Header from "./HeaderComponent"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import InformationBox from "./InformationBoxComponent"

import { useState } from "react"
import { LoginMessages } from "../global/textData"
import { loginStatusTypes } from "../global/variables"
import { informationTypes } from "../global/variables"
import { Navigate } from "react-router-dom"
import { tokenUtils } from "../utils/token"

export default function LoginForm() {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [redirect,setRedirect] = useState(0);
    let infoText = "";
    let infoHeader = "";
    let infoType = "";

    function checkLoginStatus() {
        if (!loginStatus) return; 

        if (loginStatus === loginStatusTypes.incorrectCredentials) {
            infoHeader = LoginMessages.incorrectCredentials.header;
            infoText = LoginMessages.incorrectCredentials.text;
            infoType = informationTypes.error;
        }

        if (loginStatus === loginStatusTypes.error) {
            infoHeader = LoginMessages.error.header;
            infoText = LoginMessages.error.text;
            infoType = informationTypes.error;
        }

        if (loginStatus === loginStatusTypes.serverError) {
            infoHeader = LoginMessages.serverError.header;
            infoText = LoginMessages.serverError.text;
            infoType = informationTypes.error;
        }
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const FormData = {
                username: username,
                password: password
            }

            fetch(
                "http://localhost:3000/api/login", 
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify({FormData})
                }
            )
            .then ( async (res) => {
                if (res.ok) {
                    const response = await res.json();
                    const {token} = response;
                    tokenUtils.setToken(token);
                    setRedirect(1);
                }
                else if (res.status === 401) {
                    setLoginStatus(loginStatusTypes.incorrectCredentials);
                }
                else if (res.status === 500) {
                    setLoginStatus(loginStatusTypes.serverError);
                }
                else {
                    setLoginStatus(loginStatusTypes.error);
                }
            })
            .catch((err) => {
                setLoginStatus(loginStatusTypes.error);
            })
        }
        catch {
            setLoginStatus(loginStatusTypes.error);
        }
    }

    checkLoginStatus();

    if (redirect) return <Navigate to="/Gallery" replace/>
    
    return (
        <Form onSubmit={handleSubmit}>
            <Header text="Login"/>
            <Label htmlFor="username" text="Username" />
            <InputText type="text" id="username" name="username" value={username} onChange={handleUsernameChange} isRequired={true}/>
            <Label htmlFor="password" text="Password" />
            <InputText type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isRequired={true}/>
            <InputButton type="submit" value="Log in" />
            {loginStatus ? <InformationBox header={infoHeader} text={infoText} type={infoType}></InformationBox> : null}
        </Form>
    )
}