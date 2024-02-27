import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/404');
	}, []);

	return (
		<div className="flex flex-col h-full items-center justify-center">
			<article className="text-center">
				<h2 className="text-white text-3xl">404</h2>
				<p className="text-white mt-2">페이지를 찾을 수 없습니다.😅</p>
				<button className="btn btn-primary mt-6" onClick={() => navigate(`/`)}>
					홈으로
				</button>
			</article>
		</div>
	);
}
