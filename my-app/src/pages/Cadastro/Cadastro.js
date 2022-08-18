import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import "./Cadastro.css";


function Cadastro() {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const validationLogin = yup.object({
        usuario: yup.string().required("Campo obrigatório !"),
        senha: yup.string().required("Campo obrigatório !"),
        confirmarSenha: yup.string().required("Campo obrigatório !")

    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationLogin),
    });

    const handleCadastro = (e) => {
        e.preventDefault();

        if (usuario != "" && senha != "" && senha == confirmarSenha) {
            localStorage.setItem('email', usuario);
            localStorage.setItem('senha', senha);
            localStorage.setItem('confirmarSenha', confirmarSenha);
            navigate('/login')
        } else {
            setShow(true)
            alert("Dados incorretos!")
        }

    }

    const entrar = evt => {
        evt.preventDefault()
        console.log(usuario)
        console.log(senha)
        console.log(confirmarSenha)
    }

    const [valuesPassword, setValuesPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const [valuesLogin, setValuesLogin] = React.useState({
        login: "",
        showLogin: false,
    });


    const handleClickShowPassword = () => {
        setValuesPassword({ ...valuesPassword, showPassword: !valuesPassword.showPassword });
    };
    const handleClickShowConfirmPassword = () => {
        setValuesConfirmPassword({ ...valuesConfirmPassword, showConfirmPassword: !valuesConfirmPassword.showConfirmPassword });
    };
    const handleClickShowLogin = () => {
        setValuesLogin({ ...valuesLogin, showLogin: !valuesLogin.showLogin });
    };

    return (
        <>
            <div className="cardLogin">
                <div className="cadastroContainer">
                    <Form onSubmit={handleSubmit(handleCadastro)}>
                        <div>
                            <label className="senhaInput">Usuário</label>
                            <Input
                                className="Input"
                                {...register("usuario")}
                                onChange={evt => setUsuario(evt.target.value)}
                                value={usuario}
                            />
                            <p className="error-message">{errors.usuario?.message}</p>
                        </div>
                        <div>
                            <label className="senhaInput">Senha</label>
                            <Input
                                type={valuesPassword.showPassword ? "text" : "password"}
                                className="Input"
                                {...register("senha")}
                                onChange={evt => setSenha(evt.target.value)}
                                value={senha}
                                endAdornment={
                                    <inputAdornment>
                                        <IconButton onClick={handleClickShowPassword}>
                                            {valuesPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </inputAdornment>
                                }
                            />
                            <p className="error-message">{errors.senha?.message}</p>
                        </div>
                        <div>
                            <label className="senhaInput">Confirmar Senha</label>
                            <Input
                                type={valuesConfirmPassword.showConfirmPassword ? "text" : "password"}
                                className="Input"
                                {...register("confirmarSenha")}
                                onChange={evt => setConfirmarSenha(evt.target.value)}
                                value={confirmarSenha}
                                endAdornment={
                                    <inputAdornment>
                                        <IconButton onClick={handleClickShowConfirmPassword}>
                                            {valuesConfirmPassword.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </inputAdornment>
                                }
                            />
                            <p className="error-message">{errors.confirmarSenha?.message}</p>
                        </div>
                        <a onClick={handleCadastro} className="textoLogin">
                            <button type="submit" className="botaoLogin">
                                Criar conta
                            </button>
                        </a>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Cadastro;
