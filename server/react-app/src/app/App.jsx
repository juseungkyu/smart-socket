import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './basic.css'

import Header from './basic/header/Header';
import Footer from './basic/footer/Footer'

import NotFound from './page/NotFound';

import Main from './page/main/Main';
import DeviceCreate from './page/deviceCreate/DeviceCreate';
import DeviceList from './page/deviceList/DeviceList';
import Login from './page/login/Login';
import Join from './page/join/Join';

function App(props) {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>

					<Route path="/device/create" element={<DeviceCreate />}></Route>
					<Route path="/device/list" element={<DeviceList />}></Route>

					<Route path="/login" element={<Login />}></Route>
					<Route path="/join" element={<Join />}></Route>

					<Route path="*" element={<NotFound />}></Route>
				</Routes>
				<Footer/>
			</BrowserRouter>
		</div>
	);
};

export default App;