import React from 'react';
import MenuElement from './MenuElement/MenuElement';
import './menu.css'

function Menu(props) {
    return(
        <nav className='d-flex menu'>
            <MenuElement name="디바이스 목록" link="/device/all"/>
            <MenuElement name="디바이스 등록" link="/device/create"/>
            <MenuElement name="로그인" link="/login"/>
            <MenuElement name="회원가입" link="/join"/>
        </nav>
    )
}

export default Menu;