import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom, accessTokenAtom, userInfoAtom } from '../../atom';
import axios from 'axios';
import { customAxios } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
// import { accessAtom, uuidAtom, roomAtom, nicknameAtom } from '../utils/atom';

export default function KakaoLogin() {
	const navigate = useNavigate();
	const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get('code');
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);
	const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

	const kakaoLoginCode = async () => {
		try {
			await axios.post(`https://121.140.7.121:1444/api/user/login`, { code: AUTHORIZATION_CODE }).then((result) => {
				const { status, data } = result;
				console.log(status);
				if (status === 200) {
					console.log(data);
					setAccessToken(data.access);
					setUserInfo((prev) => ({ ...prev, username: data.username, current_location: data.current_location }));
					navigate('/home'); // 404 에러남...ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ
					// setNickname(data.user.nickname);
					// setUuid(data.user.uuid.split('-').join(''));
					// setCurrentroom(data.user.uuid.split('-').join(''));
				}
				// else if (status === 201 || status === 206) {
				// 	navigate('/nickname', { state: { user_uuid: data.user_uuid } });
				// } else {
				// 	navigate('/');
				// }
			});
		} catch (error) {
			// 회원 가입 해야 될 때
			if (error.response.status === 401) {
				setUserRegisterInfo((prev) => ({ ...prev, email: error.response.data.email }));
				navigate('/sign-up-1');
			}
		}
	};
	console.log(userRegisterInfo);
	console.log(accessToken);
	console.log(userInfo);
	useEffect(() => {
		kakaoLoginCode();
	}, []);
}
// toto AUTHORIZATION_CODE 까지 확인햇고 블로그 보면서 따라하기
