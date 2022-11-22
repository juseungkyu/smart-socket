import { Link } from 'react-router-dom';
import './menuElement.css'

function MenuElement(props) {
    const {name, link} = props;
    let {onClick} = props

    if(!onClick){
        onClick = ()=>{}
    }
    

    return(
        <div className='menu-element'>
            <Link className='d-block' to={link} onClick={onClick}>{name}</Link>
        </div>
    )
}

export default MenuElement;