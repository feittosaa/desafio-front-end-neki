import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const MainRoutes = () => {

    const Private = ({ Item }) => {
        const signed = useAuth();

        return signed > 0 ? <Item /> : <Login />
    }

    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Private Item={Home} />} />
                    <Route exact path="/cadastrar" element={<Cadastro />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default MainRoutes;
