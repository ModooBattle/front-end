import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom, userInfoAtom } from '../../atom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
	const navigate = useNavigate();
	const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get('code');
	// const testUrl = new URL(document.location.toString());
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

	// console.log(testUrl); // http://127.0.0.1:3000/oauth/callback/kakao?code=xZWcwwdt84SfQ4vylPFiLYG8475cjPmbwP9qUo8AIyQzjUiUH2WkAFf5mTMKPXSYAAABjawsgEQWphHJzwXJqw
	// console.log(AUTHORIZATION_CODE); //h4dlA1MaLVNlrtcv7TZG6r90VFNdvreKapdnXU2JUC_M_Y2Mo510NhTRn90KPXVbAAABjawm_Y-i-KZYUq23DA

	const kakaoLoginCode = async () => {
		try {
			await axios.post(`user/login`, { code: AUTHORIZATION_CODE }).then((result) => {
				const { status, data } = result;
				if (status === 200) {
					setUserInfo((prev) => ({ ...prev, access: data.access, user: data.user }));
					navigate('/home');
				}
			});
		} catch (error) {
			// 회원 가입 해야 될 때
			if (error.response.status === 401) {
				setUserRegisterInfo((prev) => ({ ...prev, email: error.response.data.email }));
				navigate('/sign-up-1');
			}
		}
	};

	console.log(userInfo);

	useEffect(() => {
		kakaoLoginCode();
	}, []);
}
// toto AUTHORIZATION_CODE 까지 확인햇고 블로그 보면서 따라하기
