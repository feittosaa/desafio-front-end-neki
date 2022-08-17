import "./Header.css"
import logout from "../../assets/logout.png"

function Header() {
    return (
        <div className="header">
            <a href="/login">
                <img src={logout} className="logout" />
            </a>
        </div>
    );
}

export default Header;
