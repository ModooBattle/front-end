import axios from 'axios';
import { useRecoilState } from 'recoil';
import { accessTokenAtom, userInfoAtom } from './atom';
import { useNavigate } from 'react-router-dom';

export default function useAxios() {
	const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

	const navigate = useNavigate();

	console.log(accessToken);

	const privateAxios = axios.create({
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	privateAxios.interceptors.response.use(
		function (response) {
			return response;
		},
		async function (err) {
			console.log(err);
			if (err.response && err.response.status === 403) {
				const access_token = await refreshAccessToken();

				err.config.headers = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				};
				const response = await axios.request(err.config);
				return response;
			}

			return Promise.reject(err);
		}
	);

	const refreshAccessToken = async () => {
		let access_token = '';
		await axios
			.post('/user/access')
			.then((res) => {
				console.log(res);
				setAccessToken(res.data.access_token);
				setUserInfo((prev) => ({ ...prev, username: res.data.username, current_location: res.data.current_location }));

				access_token = res.data.access_token;
			})
			.catch((e) => {
				console.log(e);
				navigate('/login');
			});
		return access_token;
	};

	console.log(accessToken);

	return privateAxios;
}
