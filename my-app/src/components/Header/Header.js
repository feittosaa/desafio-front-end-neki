import "./Header.css"
import logout from "../../assets/logout.png"
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Header() {

    const { signout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="header">
            <div onClick={() => [signout(), navigate("/login")]}>
                <img src={logout} className="logout" />
            </div>
        </div>
    );
}

export default Header;
