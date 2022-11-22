import React from 'react';
import MenuElement from './MenuElement/MenuElement';

import { useContext } from "react";
import MemberContext from "../../../../context/MemberContext";

import './menu.css'

function getMenu({memberId, setMemberId}) {
    const menuList = [
        <MenuElement name="디바이스 목록" link="/device/list"/>,
        <MenuElement name="디바이스 등록" link="/device/create"/>
    ]

    if(memberId === undefined) {
        menuList.push(<MenuElement name="로그인" link="/login"/>)
        menuList.push(<MenuElement name="회원가입" link="/join"/>)
    } else {
        let isProcessing = false
        const logoutClick = async ()=>{
            console.log('logout')
            setMemberId(undefined)
            // if (isProcessing) {
            //     return
            // }
            // isProcessing = true

            // try {
            //     const response = await axios.get('/api/member/logout');
            //     console.log(response)
            //     hisotry.push(`/`);
            // } catch (error) {
            //     alert('로그아웃 실패')
            //     isProcessing = false
            //     return
            // }

            // setMemberId(Cookies.get('member_id'))
            // isProcessing = false
        }

        menuList.push(<MenuElement name="로그아웃" onClick={logoutClick} />)
        menuList.push(<MenuElement name="" link=""/>)
    }

    return menuList
}

function Menu(props) {
    const {memberId, setMemberId} = useContext(MemberContext)
    const menuList = getMenu({memberId, setMemberId})

    return(
        <nav className='d-flex menu'>
            {menuList}
        </nav>
    )
}

export default Menu;