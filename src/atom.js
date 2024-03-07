import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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

export const userInfoAtom = atom({
	key: 'userInfo',
	default: {
		access: '',
		user: {
			id: null,
			username: '',
			age: '',
			gender: '',
			years: null,
			last_login: '',
			weight: {
				id: null,
				name: '',
				min_weight: null
			},
			gym: {
				id: null,
				name: '',
				address: '',
				latitude: null,
				longitude: null,
				sport: null
			},
			current_location: ''
		}
	}
});

export const chatTargetInfoAtom = atom({
	key: 'chatTargetInfo',
	default: {
		receiverId: null,
		receiverName: ''
	},
	effects_UNSTABLE: [persistAtom]
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
