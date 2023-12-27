import { KAKAO_TOKEN_API } from './apis';

export const getKakaoToken = async (data) => {
	return await KAKAO_TOKEN_API.post('/oauth/token', {
		grant_type: 'authorization_code',
		client_id: data.client_id,
		redirect_uri: data.redirect_uri,
		code: data.code
	});
};
