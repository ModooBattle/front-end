import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/index';
import Login from './pages/authentication/Login';
import KakaoLogin from './pages/authentication/KakaoLogin';
import SignUp1 from './pages/authentication/sign-up-steps/SignUp-1';
import SignUp2 from './pages/authentication/sign-up-steps/SignUp-2';
import SignUp3 from './pages/authentication/sign-up-steps/SignUp-3';
import SignUp4 from './pages/authentication/sign-up-steps/SignUp-4';
import SignUp5 from './pages/authentication/sign-up-steps/SignUp-5';
import SignUp6 from './pages/authentication/sign-up-steps/SignUp-6';
import SignUp7 from './pages/authentication/sign-up-steps/SignUp-7';
import SignUp8 from './pages/authentication/sign-up-steps/SignUp-8';
import SignUp9 from './pages/authentication/sign-up-steps/SignUp-9';
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
					<Route path="/sign-up-3" element={<SignUp3 />} />
					<Route path="/sign-up-4" element={<SignUp4 />} />
					<Route path="/sign-up-5" element={<SignUp5 />} />
					<Route path="/sign-up-6" element={<SignUp6 />} />
					<Route path="/sign-up-7" element={<SignUp7 />} />
					<Route path="/sign-up-8" element={<SignUp8 />} />
					<Route path="/sign-up-9" element={<SignUp9 />} />
					{/* <Route path="/main" element={<Main />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
