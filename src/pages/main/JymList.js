import { useCallback, useEffect, useState } from 'react';
import useAxios from '../../useAxios';

export default function JymList() {
	const pAxios = useAxios();
	const [jymList, setJymList] = useState(null);

	const getJymList = useCallback(async () => {
		try {
			await pAxios.get(`/sport/gym/list?distance_limit=20&page_no=1&length=5`).then((result) => {
				console.log(result);
				if (result.status === 200) {
					setJymList(result.data);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [jymList]);

	useEffect(() => {
		getJymList();
	}, []);

	// console.log(jymList !== null);

	// return <ul>{jymList !== null ? jymList.map((data) => <li key={data.id}>{data}</li>) : '데이터 없음'}</ul>;
}
