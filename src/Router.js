import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/index';
import PrivateProvider from './contexts/PrivateProvider';
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
import Home from './pages/main/home';
import JymListDetail from './pages/main/JymListDetail';
import NotFoundPage from './pages/404';
// import Main from './pages/Main/Main';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PrivateProvider />}>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/home/:detail" element={<JymListDetail />} />
						{/* <Route path="/main" element={<Main />} /> */}
					</Route>
				</Route>
				{/* Authencation */}
				<Route element={<Layout />}>
					<Route path="/oauth/login" element={<Login />} />
					<Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
					<Route path="/oauth/sign-up-1" element={<SignUp1 />} />
					<Route path="/oauth/sign-up-2" element={<SignUp2 />} />
					<Route path="/oauth/sign-up-3" element={<SignUp3 />} />
					<Route path="/oauth/sign-up-4" element={<SignUp4 />} />
					<Route path="/oauth/sign-up-5" element={<SignUp5 />} />
					<Route path="/oauth/sign-up-6" element={<SignUp6 />} />
					<Route path="/oauth/sign-up-7" element={<SignUp7 />} />
					<Route path="/oauth/sign-up-8" element={<SignUp8 />} />
				</Route>
				{/* 404 */}
				<Route element={<Layout />}>
					<Route path="/*" element={<NotFoundPage />} />
					<Route path="/404" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
