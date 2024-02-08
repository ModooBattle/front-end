import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom, userInfoAtom } from '../../atom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
	const navigate = useNavigate();
	const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get('code');
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

	const kakaoLoginCode = async () => {
		try {
			await axios.post(`user/login`, { code: AUTHORIZATION_CODE }).then((result) => {
				const { status, data } = result;
				if (status === 200) {
					setUserInfo((prev) => ({
						...prev,
						access: data.access,
						username: data.username,
						current_location: data.current_location
					})); //엑세스토큰 저장

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
	useEffect(() => {
		kakaoLoginCode();
	}, []);
}
// toto AUTHORIZATION_CODE 까지 확인햇고 블로그 보면서 따라하기
