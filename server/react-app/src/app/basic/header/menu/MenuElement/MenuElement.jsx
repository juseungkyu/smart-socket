import { Link } from 'react-router-dom';
import './menuElement.css'

function MenuElement(props) {
    const {name, link} = props;

    return(
        <div className='menu-element'>
            <Link className='d-block' to={link}>{name}</Link>
        </div>
    )
}

export default MenuElement;