import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export default function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cadastrar" element={<Cadastro />} />
            </Routes>
        </Router>
    )
}