import React from 'react';
import MenuElement from './MenuElement/MenuElement';

import { useContext } from "react";
import MemberContext from "../../../../context/MemberContext";
import axios from 'axios';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history'
import { useNavigate } from "react-router-dom";

import './menu.css'

const history = createBrowserHistory()

/**
 * 로그인 상태에 따라서 MenuElement List를 반환해줌
 * @param navigate createBrowserHistory()
 * @param {*} param1 
 * @returns MenuElement List
 */
function getMenu(navigate, {memberId, setMemberId, setIsAdmin}) {
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
            if (isProcessing) {
                return
            }
            isProcessing = true

            try {
                const response = await axios.get('/api/member/logout');
                console.log(response)
                history.push(`/`);
            } catch (error) {
                alert('로그아웃 실패')
                isProcessing = false
                return
            }

            setMemberId(Cookies.get('member_id'))
            setIsAdmin(Cookies.get('is_admin'))
            navigate('/');
            isProcessing = false
        }

        menuList.push(<MenuElement name="로그아웃" onClick={logoutClick} />)
        menuList.push(<MenuElement name="관리자" link="/admin"/>)
    }

    return menuList
}

/**
 * Menu 컴포넌트
 * @param {*} props 
 * @returns Menu
 */
function Menu(props) {
    const navigate = useNavigate();
    const {memberId, setMemberId, setIsAdmin} = useContext(MemberContext)
    const menuList = getMenu(navigate, {memberId, setMemberId, setIsAdmin})

    return(
        <nav className='d-flex menu'>
            {menuList}
        </nav>
    )
}

export default Menu;