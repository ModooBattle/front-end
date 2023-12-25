import React from 'react';
import { styled } from 'styled-components';

const Title = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes.title};
	color: ${({ theme }) => theme.colors.grey};
`;

const KakaoLoginBtn = styled.button`
	display: flex;
	width: 342px;
	height: 48px;
	padding: 8px 12px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 8px;
	background: #fee500;
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
		<div className="bg-white">
			<Title>모두의 대결</Title>
			<h3>
				1대1 종합 격투기
				<br />
				매칭 사이트
				<br />
				모두의 대결
			</h3>
			<svg width="345" height="335" viewBox="0 0 345 335" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M141.236 334.555C106.407 334.555 71.6502 327.385 38.9625 313.301C6.27472 299.217 -8.80774 261.32 5.27649 228.633C19.3607 195.945 57.2574 180.862 89.9452 194.947C135.574 214.603 188.353 206.417 221.277 174.564C261.969 135.198 254.182 75.9022 253.838 73.3976C248.901 38.1507 273.457 5.59004 308.704 0.635157C343.951 -4.31973 376.512 20.2551 381.467 55.5019C384.425 76.5919 394.916 185.89 310.882 267.183C276.017 300.905 231.677 323.029 182.654 331.142C168.933 333.411 155.085 334.536 141.255 334.536L141.236 334.555Z"
					fill="#FFC524"
				/>
				<path
					d="M49.2896 270.032C56.7492 276.276 65.3703 280.868 74.5723 283.626C78.4563 301.831 88.8924 318.692 104.175 331.832C116.462 333.629 128.858 334.555 141.255 334.555C155.085 334.555 168.915 333.429 182.654 331.161C231.677 323.048 276.035 300.923 310.882 267.201C315.601 262.627 320.012 257.963 324.15 253.244C321.645 249.578 318.814 246.165 315.692 243.044C313.296 236.056 309.848 229.123 305.238 222.389L297.47 211.046L289.701 199.702C278.721 183.639 263.33 171.878 245.924 164.328C258.393 145.779 255.162 132.62 251.478 125.76C249.518 122.13 246.069 119.516 242.076 118.427C218.119 111.839 199.987 130.388 190.114 144.4C186.829 139.717 181.511 136.867 177.01 135.18C171.782 133.219 166.12 132.512 160.62 133.437C135.846 137.593 129.203 167.141 127.878 174.819C118.295 181.498 109.801 189.774 102.995 199.702L95.2267 211.046L87.4586 222.389C85.2443 225.638 83.3023 228.923 81.6144 232.226C66.8586 223.678 48.6 215.837 29.5245 214.131C22.9725 213.55 16.9649 218.287 16.4749 224.858C15.8578 233.188 22.065 247.218 49.2715 270.032H49.2896Z"
					fill="black"
				/>
			</svg>
			<KakaoLoginBtn onClick={handleKakaoLogin}>카카오 로그인</KakaoLoginBtn>
		</div>
	);
}
