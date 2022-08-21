import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import "./Login.css";


const Login = () => {

    const { signin } = useAuth();
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!usuario | !senha) {
            setError("Preencha todos os campos");
            return;
        }

        const res = signin(usuario, senha);

        if (res) {
            setError(res);
            return;
        }

        navigate("/home");
    };

    const [valuesPassword, setValuesPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValuesPassword({ ...valuesPassword, showPassword: !valuesPassword.showPassword });
    };

    return (
        <>
            <div className="cardLogin">
                <div className="loginContainer">
                    <Form >
                        <div>
                            <label className="senhaInput">Usuário</label>
                            <Input
                                type="usuario"
                                placeholder='Insira o Usuário'
                                className="Input"
                                value={usuario}
                                onChange={(e) => [setUsuario(e.target.value), setError("")]}
                            />
                        </div>
                        <div>
                            <label className="senhaInput">Senha</label>
                            <Input
                                type={valuesPassword.showPassword ? "text" : "password"}
                                placeholder='Insira a Senha'
                                className="Input"
                                onChange={(e) => [setSenha(e.target.value), setError("")]}
                                value={senha}
                                endAdornment={
                                    <inputAdornment>
                                        <IconButton onClick={handleClickShowPassword}>
                                            {valuesPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </inputAdornment>
                                }
                            />
                            <p className='errorLogin'>{error}</p>
                        </div>
                        <div className="textoLogin">
                            <button type="submit" className="botaoLogin" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </Form>
                    <a className="textoConta" href='/cadastrar'>
                        Criar conta
                    </a>
                </div>
            </div>
        </>
    );
}

export default Login;
