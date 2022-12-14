import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './basic.css'

import Header from './basic/header/Header';
import Footer from './basic/footer/Footer'

import NotFound from './page/NotFound';

import Main from './page/main/Main';
import DeviceCreate from './page/deviceCreate/DeviceCreate';
import DeviceList from './page/deviceList/DeviceList';
import DeviceView from './page/deviceView/DeviceView';
import Login from './page/login/Login';
import Join from './page/join/Join';
import Admin from './page/admin/Admin'

import MemberContext from '../context/MemberContext';
import Cookies from 'js-cookie';

/**
 * 최상위 요소
 * @param {*} props 
 * @returns app 
 */
function App(props) {
	// 세션 정보 받아오기 
	const [memberId, setMemberId] = useState(Cookies.get('member_id'))
	const [isAdmin, setIsAdmin] = useState(Cookies.get('is_admin'))

	return (
		<div className='App'>
			<MemberContext.Provider value={{memberId, setMemberId, isAdmin, setIsAdmin}}>
				<BrowserRouter >
					<Header />
					<Routes>
						<Route path="/" element={<Main />}></Route>

						<Route path="/device/create" element={<DeviceCreate />}></Route>
						<Route path="/device/list" element={<DeviceList />}></Route>
						<Route path="/device/:deviceId" element={<DeviceView />}></Route>

						<Route path="/login" element={<Login />}></Route>
						<Route path="/join" element={<Join />}></Route>

						<Route path="/admin" element={<Admin />}></Route>

						<Route path="*" element={<NotFound />}></Route>
					</Routes>
					<Footer/>
				</BrowserRouter>
			</MemberContext.Provider>
		</div>
	);
};

export default App;