import { Link } from 'react-router-dom';
import './menuElement.css'

/**
 * MenuElement 컴포넌트
 * @param {*} props 
 * @returns MenuElement
 */
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