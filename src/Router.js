import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/index';
import Login from './pages/authentication/Login';
import KakaoLogin from './pages/authentication/KakaoLogin';
import SignUp1 from './pages/authentication/sign-up-steps/SignUp-1';
import SignUp2 from './pages/authentication/sign-up-steps/SignUp-2';
// import Main from './pages/Main/Main';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Login />} />
					<Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
					<Route path="/sign-up-1" element={<SignUp1 />} />
					<Route path="/sign-up-2" element={<SignUp2 />} />
					{/* <Route path="/main" element={<Main />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
