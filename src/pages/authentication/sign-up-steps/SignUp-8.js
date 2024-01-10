import { styled } from 'styled-components';
import { motion } from 'framer-motion';

// <motion.div  />
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
					stroke-width="12"
					stroke-linecap="round"
				/>
			</g>
		</motion.svg>
	);
};

const SignUpLayout = styled.section`
	color: #fff;
	height: 100%;
`;

const NavTop = styled.section`
	padding: 16px 24px;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 0;
`;

const Title = styled.h3`
	padding-top: 44px;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 36px */
`;

export default function SignUp8() {
	return (
		<SignUpLayout>
			<NavTop>모두의 대결</NavTop>
			<section className="flex flex-col justify-center h-full">
				<div className="flex justify-center">
					<MyComponent />
				</div>
				<Title className="text-center">회원가입 완료!</Title>
				<p className="text-center">지금 바로 시작 하세요!</p>
			</section>
		</SignUpLayout>
	);
}
