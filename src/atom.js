import { atom } from 'recoil';

export const userRegisterInfoAtom = atom({
	key: 'userRegisterInfo',
	default: {
		username: '',
		age: '',
		gender: '',
		years: null,
		email: '',
		weight: null,
		gym: {
			name: '',
			address: '',
			latitude: null,
			longitude: null,
			sport: null
		}
	}
});

// authorization
export const accessTokenAtom = atom({
	key: 'accessToken',
	default: null
});

export const userInfoAtom = atom({
	key: 'userInfo',
	default: { access: '', username: '', current_location: '' }
});

//authentication
// export const userAtom = atom({
// 	key: 'userAtom',
// 	default: null
// });

// //logedinProvise 위한  recoil
// export const userIdLogedInAtom = atom({
// 	key: 'userIdLogedIn',
// 	default: null
// });
