import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/index';
import Login from './pages/authentication/Login';
import KakaoLogin from './pages/authentication/KakaoLogin';
// import Main from './pages/Main/Main';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Login />} />
					<Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
					{/* <Route path="/main" element={<Main />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
