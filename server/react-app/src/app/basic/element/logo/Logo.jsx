import logoImage from './tempLogo.jpg'
import './logo.css'
import { Link } from 'react-router-dom';

function Logo(props) {
    return(
        <Link to="/" className='logo'>
            <img src={logoImage} alt="logo" />
        </Link>
    )
}

export default Logo;