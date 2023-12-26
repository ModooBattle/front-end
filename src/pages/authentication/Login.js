import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as IntroImg } from '../../asset/images/intro.svg';
import { ReactComponent as KakaoIcon } from '../../asset/images/kakao.svg';

const LoginLayout = styled.section`
	color: #ffffff;
	display: flex;
	flex-direction: column;
	height: 100%;
	> .title {
		font-size: 20px;
		font-family: GmarketSansBold;
		margin-top: 162px;
	}
	> .intro-word {
		font-size: 38px;
		font-family: GmarketSansBold;
		margin-top: 32px;
	}
	> .intro-section {
		position: relative;
		height: 335px;
		> .intro-img-wrap {
			position: absolute;
			display: flex;
			right: 0;
		}
	}
`;

const KakaoLoginBtn = styled.button`
	display: flex;
	height: 48px;
	padding: 8px 12px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 8px;
	background: #fee500;
	font-size: 16px;
	color: #371d1e;
`;

export default function Login() {
	const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
	const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
	const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	const handleKakaoLogin = () => {
		window.location.href = KAKAO_AUTH_URI;
	};

	// src/components/layout/KakaoLayout.ts
	const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get('code');
	console.log(AUTHORIZATION_CODE);

	return (
		<LoginLayout>
			<h2 className="title">모두의 대결</h2>
			<h3 className="intro-word">
				1대1 종합 격투기
				<br />
				매칭 사이트
				<br />
				모두의 대결
			</h3>
			<section className="intro-section">
				<div className="intro-img-wrap">
					<IntroImg />
				</div>
			</section>
			<section className="relative">
				<KakaoLoginBtn className="flex w-full" onClick={handleKakaoLogin}>
					<KakaoIcon />
					카카오 로그인
				</KakaoLoginBtn>
			</section>
		</LoginLayout>
	);
}
