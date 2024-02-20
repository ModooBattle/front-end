import { useEffect } from 'react';
import useAxios from '../../useAxios';

export default function JymList() {
	const pAxios = useAxios();

	const getJymList = async () => {
		try {
			await pAxios.get(`/sport/gym/list?distance_limit=20&page_no=1&length=5`).then((result) => {
				console.log(result);
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getJymList();
	}, []);
}
