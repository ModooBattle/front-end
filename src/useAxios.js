import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from './atom';
import { useNavigate } from 'react-router-dom';

export default function useAxios() {
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

	const navigate = useNavigate();

	// console.log(userInfo);

	const privateAxios = axios.create({
		headers: {
			Authorization: `Bearer ${userInfo.access}`
		}
	});

	// console.log(userInfo.access);

	privateAxios.interceptors.response.use(
		function (response) {
			return response;
		},
		async function (err) {
			console.log(err);
			if (err.response && err.response.status === 403) {
				console.log(access_token);
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
				// console.log(res);
				// setAccessToken(res.data.access_token);
				console.log(res.data.current_location);
				setUserInfo((prev) => ({
					...prev,
					access: res.data.access,
					username: res.data.username,
					current_location: res.data.current_location
				}));

				access_token = res.data.access;
			})
			.catch((e) => {
				console.log(e);
				navigate('/login');
			});
		return access_token;
	};

	return privateAxios;
}
