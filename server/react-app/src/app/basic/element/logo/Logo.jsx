import logoImage from './임시로고.jpg'
import './logo.css'

function Logo(props) {
    return(
        <a href="/" className='logo'>
            <img src={logoImage} alt="logo" />
        </a>
    )
}

export default Logo;