import axios from 'axios';

export const customAxios = axios.create({
	baseURL: `https://121.140.7.121:1444/api/`, // 기본 서버 주소 입력
	headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
});
