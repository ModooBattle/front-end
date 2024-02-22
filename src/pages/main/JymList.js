import { useCallback, useEffect, useState } from 'react';
import useAxios from '../../useAxios';
import { useInView } from 'react-intersection-observer';

export default function JymList({ userCurrentLocation }) {
	const pAxios = useAxios();
	const [jymList, setJymList] = useState(null);
	const [page, setPage] = useState(1); // 현재 페이지 번호 (페이지네이션)
	const [ref, inView] = useInView();

	const getJymList = useCallback(async () => {
		try {
			await pAxios.get(`/sport/gym/list?distance_limit=20&page_no=1&length=8`).then((result) => {
				if (result.status === 200) {
					setJymList(result.data);
					setPage((page) => page + 1);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [jymList, userCurrentLocation]);

	const scrollGetJymList = useCallback(async () => {
		try {
			await pAxios.get(`/sport/gym/list?distance_limit=20&page_no=${page}&length=8`).then((result) => {
				if (result.status === 200) {
					setJymList([...jymList, ...result.data]);
					setPage((page) => page + 1);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [jymList, userCurrentLocation]);

	useEffect(() => {
		getJymList();
	}, []);

	useEffect(() => {
		// inView가 true 일때만 실행한다.
		if (inView) {
			scrollGetJymList();
		}
	}, [inView]);

	return (
		<article className="h-full flex flex-col justify-between overflow-y-scroll">
			{userCurrentLocation !== null ? (
				<>
					<ul role="list" className="divide-y divide-gray-100">
						{jymList !== null
							? jymList.map((row) => (
									<li key={row.id} className="flex justify-between gap-x-6 my-5 bg-neutral p-3 rounded-md">
										{console.log(row)}
										<div className="flex min-w-0 gap-x-4">
											<div className="h-12 w-12 flex rounded-full bg-base-200 justify-center items-center">
												<img className="w-6" src="/images/images/boxing.svg" alt="" />
											</div>
											<div className="min-w-0 flex-auto">
												<p className="text-sm font-semibold leading-6">{row.name}</p>
												<p className="mt-1 truncate text-xs leading-5">{row.address}</p>
											</div>
										</div>
										<div className="shrink-0 sm:flex sm:flex-col sm:items-end">
											<p className="text-sm leading-6">{row.distance}km</p>
											<div className="mt-1 flex items-center gap-x-1.5">
												<div className="flex-none rounded-full bg-emerald-500/20 p-1">
													<div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
												</div>
												<p className="text-xs leading-5 text-gray-500">{row.users.length} 명</p>
											</div>
										</div>
									</li>
							  ))
							: 'loading'}
						<li ref={ref}></li>
					</ul>
				</>
			) : (
				<div className="h-full flex flex-col justify-center px-6 py-12 lg:px-8">
					<p className="text-center">'대결 하고 싶은 위치를 설정 해 주세요.'</p>
				</div>
			)}
		</article>
	);
}
