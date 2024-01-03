import { atom } from 'recoil';

const userRegisterInfoAtom = atom({
	key: 'userRegisterInfo',
	default: {
		username: '',
		age: '',
		gender: '',
		years: null,
		email: '',
		weight: null,
		location: {
			address: '',
			latitude: null,
			longitude: null
		},
		gym: {
			name: '',
			address: '',
			latitude: null,
			longitude: null,
			sport: null
		}
	}
});
