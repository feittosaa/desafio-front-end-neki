import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import "./Cadastro.css";

function Cadastro() {

    const navigate = useNavigate()
    const { signup } = useAuth();

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        if (!usuario | !confirmarSenha | !senha) {
            setError("Preencha todos os campos");
            return;
        } else if (senha !== confirmarSenha) {
            setError("As senhas não são iguais");
            return;
        }

        const res = signup(senha, usuario);

        if (res) {
            setError(res);
            return;
        }

        alert("Usuário cadastrado com sucesso!");
        navigate("/");
    };

    const [valuesPassword, setValuesPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValuesPassword({ ...valuesPassword, showPassword: !valuesPassword.showPassword });
    };
    const handleClickShowConfirmPassword = () => {
        setValuesConfirmPassword({ ...valuesConfirmPassword, showConfirmPassword: !valuesConfirmPassword.showConfirmPassword });
    };

    return (
        <>
            <div className="cardLogin">
                <div className="cadastroContainer">
                    <Form>
                        <div>
                            <label className="senhaInput">Usuário</label>
                            <Input
                                type="usuario"
                                placeholder='Insira o Usuário'
                                className="Input"
                                onChange={(e) => [setUsuario(e.target.value), setError("")]}
                                value={usuario}
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
                        </div>
                        <div>
                            <label className="senhaInput">Confirmar Senha</label>
                            <Input
                                type={valuesConfirmPassword.showConfirmPassword ? "text" : "password"}
                                className="Input"
                                placeholder='Confirme a Senha'
                                onChange={(e) => [setConfirmarSenha(e.target.value), setError("")]}
                                value={confirmarSenha}
                                endAdornment={
                                    <inputAdornment>
                                        <IconButton onClick={handleClickShowConfirmPassword}>
                                            {valuesConfirmPassword.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </inputAdornment>
                                }
                            />
                        </div>
                        <button type="submit" className="botaoLogin" onClick={handleSignup}>
                            Criar conta
                        </button>
                    </Form>
                    <a className="textoConta" href='/login'>
                        Entrar
                    </a>
                </div>
            </div>
        </>
    );
}

export default Cadastro;
