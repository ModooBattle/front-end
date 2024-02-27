import { motion } from 'framer-motion';

import NavTop from '../../../layout/NavTop';
import Title from '../../../components/typography/Title';

const MyComponent = () => {
	return (
		<motion.svg width="95" height="96" viewBox="0 0 95 96" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="Group 554">
				<motion.circle
					id="Ellipse 71"
					cx="47.5"
					cy="48"
					r="47.5"
					fill="#FFF3E0"
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				/>
				<path
					id="Vector 30"
					d="M27.373 49.6102L43.4345 65.6716C43.875 66.1121 44.6067 66.047 44.9625 65.5356L70.0425 29.483"
					stroke="#FF9501"
					strokeWidth="12"
					strokeLinecap="round"
				/>
			</g>
		</motion.svg>
	);
};

export default function SignUp8() {
	const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
	const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
	const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	const handleKakaoLogin = () => {
		console.log(KAKAO_AUTH_URI);
		window.location.href = KAKAO_AUTH_URI;
	};
	return (
		<div className="flex flex-col justify-between h-full">
			<NavTop title="모두의 대결" />
			<section className="flex flex-col justify-between h-full">
				<div className="my-auto">
					<motion.div intial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<div className="flex justify-center">
							<MyComponent />
						</div>
					</motion.div>
					<Title className="text-center">회원가입 완료!</Title>
					<p className="text-center">지금 바로 시작 하세요!</p>
				</div>
				<button className="btn btn-block btn-primary" onClick={handleKakaoLogin}>
					홈으로
				</button>
			</section>
		</div>
	);
}
