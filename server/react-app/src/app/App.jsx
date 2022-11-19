import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './basic.css'

import Header from './basic/header/Header';
import Footer from './basic/footer/Footer'

import Main from './page/main/Main';
import NotFound from './page/NotFound';
// import Product from './Product';

function App(props) {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
				<Footer/>
			</BrowserRouter>
		</div>
	);
};

export default App;