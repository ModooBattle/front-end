import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../atom';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
//sweetalert2
import Swal from 'sweetalert2';

function PrivateProvider() {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

	useEffect(() => {
		if (!userInfo.access) {
			axios
				.post('/user/access', {}) //엑세스 토큰 {} 비워놓으면 리프레시토큰 확인해서 백엔드에서 액세스 토큰 자동으로 재발금
				.then((res) => {
					setUserInfo((prev) => ({
						...prev,
						access: res.data.access,
						username: res.data.username,
						current_location: res.data.current_location
					})); //엑세스토큰 저장
				})
				.catch((err) => {
					console.log(err);
					if (err.response.status == 401) {
						console.log(err);
						Swal.fire({
							icon: 'info',
							title: '정보',
							text: `세션 정보가 만료 되었습니다. 다시 로그인 해 주세요.`,
							confirmButtonText: '확인'
						});
						navigate('/login');
					}
				});
		}
	}, [userInfo.access]);

	return userInfo.access ? <Outlet /> : '';
}

export default PrivateProvider;
