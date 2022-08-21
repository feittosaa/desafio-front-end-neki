import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import useAuth from "./hooks/useAuth";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const Private = ({ Item }) => {
    const signed = useAuth();

    return signed > 0 ? <Item /> : <Login />
}

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <AuthProvider>
                    <Routes>
                        <Route path="/home" element={<Private Item={Home} />} />
                        <Route path="/login" element={<Login />} />
                        <Route exact path="/cadastrar" element={<Cadastro />} />
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </Fragment>
        </BrowserRouter>
    )
}

export default MainRoutes;
