import Logo from "../element/logo/Logo";
import Menu from "./menu/Menu";

import './header.css'

/**
 * 헤더 
 * @param {*} props 
 * @returns header
 */
function Header(props) {
    return (
        <header>
            <div className="container d-flex justify-between align-center">
                <Logo></Logo>
                <Menu></Menu>
            </div>
        </header>
    );
}

export default Header;