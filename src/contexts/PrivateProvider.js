import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenAtom, userAtom } from '../atom';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
//sweetalert2
import Swal from 'sweetalert2';

function PrivateProvider() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
	// const [userId, setUserId] = useRecoilState(userAtom);

	console.log(accessToken);

	// useEffect(() => {
	// 	if (!accessToken) {
	// 		axios
	// 			.post('/user/access', {}) //엑세스 토큰 {} 비워놓으면 리프레시토큰 확인해서 백엔드에서 액세스 토큰 자동으로 재발금
	// 			.then((res) => {
	// 				setAccessToken(res.data.access_token); //엑세스토큰 저장
	// 				// setUserId(res.data.current_user); //사용자 id 저장
	// 			})
	// 			.catch((err) => {
	// 				if (err.response.status == 401) {
	// 					console.log(err);
	// 					Swal.fire({
	// 						icon: 'info',
	// 						title: '정보',
	// 						text: `세션 정보가 만료 되었습니다. 다시 로그인 해 주세요.`,
	// 						confirmButtonText: '확인'
	// 					});
	// 					navigate('/login');
	// 				}
	// 			});
	// 	}
	// }, [accessToken]);

	// return accessToken ? <Outlet /> : '';
	// return <Outlet />;
}

export default PrivateProvider;