import { useEffect } from 'react';
import axios from 'axios';
import { customAxios } from '../../utils/axios';
// import { useNavigate } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import { accessAtom, uuidAtom, roomAtom, nicknameAtom } from '../utils/atom';

export default function KakaoLogin() {
	const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get('code');
	console.log(AUTHORIZATION_CODE);

	const kakaoLoginCode = async () => {
		try {
			await axios.post(`https://121.140.7.121:1444/api/user/login`, { code: AUTHORIZATION_CODE }).then((result) => {
				const { status, data } = result;
				if (status === 200) {
					console.log(data);
					// setAccessToken(data.tokens.access);
					// setNickname(data.user.nickname);
					// setUuid(data.user.uuid.split('-').join(''));
					// setCurrentroom(data.user.uuid.split('-').join(''));
					// navigate('/mymessage');
				} else if (status === 401) {
					// TODO 회원가입
				}
				// else if (status === 201 || status === 206) {
				// 	navigate('/nickname', { state: { user_uuid: data.user_uuid } });
				// } else {
				// 	navigate('/');
				// }
			});
		} catch (error) {}
	};
	useEffect(() => {
		kakaoLoginCode();
	}, []);
}
// toto AUTHORIZATION_CODE 까지 확인햇고 블로그 보면서 따라하기
