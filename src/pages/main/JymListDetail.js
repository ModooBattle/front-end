import { useLocation } from 'react-router-dom';
import NavTop from '../../layout/NavTop';
// 날짜 포맷
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
//
import { Icon } from '@iconify/react';

export default function JymListDetail() {
	const location = useLocation();
	const jymInfo = location.state.row;

	function foramtDate(date) {
		const d = new Date(date);
		const now = Date.now();
		const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
		if (diff < 60 * 1) {
			// 1분 미만일땐 방금 전 표기
			return '방금 전';
		}
		if (diff < 60 * 60 * 24 * 3) {
			// 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
			return formatDistanceToNow(d, { addSuffix: true, locale: ko });
		}
		return format(d, 'PPP EEE p', { locale: ko }); // 날짜 포맷
	}

	return (
		<section className="flex flex-col h-full">
			<NavTop title="모두의 대결" />
			<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
				<div className="h-12 w-12 flex rounded-full bg-base-200 justify-center items-center">
					<img className="w-6" src="/images/images/boxing.svg" alt="" />
				</div>
				<ul className="text-white">
					<li className="flex mt-2 items-center">
						<span className="text-lg">{jymInfo.name}</span>
						<Icon icon="mdi:dot" />
						<span className="text-sm">{jymInfo.users.length} 명</span>
					</li>
					<li className="flex mt-1 items-center">
						<span className="text-md">{jymInfo.address}</span>
						<Icon icon="mdi:dot" />
						<span className="text-sm">{jymInfo.distance} km </span>
					</li>
				</ul>
			</div>
			<div>
				<h5 className="title">회원 리스트</h5>
				<ul>
					{jymInfo.users.map((user) => (
						<li className="flex justify-between gap-x-6 mb-5 mt-3 bg-neutral p-3 rounded-md items-center" key={user.id}>
							<div className="flex items-center">
								{user.gender === 'F' ? (
									<div className="h-12 w-12 flex rounded-full justify-center items-center mr-2">
										<img src="/images/images/profile-men.svg" alt="" />
									</div>
								) : (
									<div className="h-12 w-12 flex rounded-full justify-center items-center mr-2">
										<img src="/images/images/profile-women.svg" alt="" />
									</div>
								)}
								<ul>
									<li className="flex items-center">
										<span className="text-white">{user.username}</span>
										<Icon icon="mdi:dot" />
										{user.gender === 'F' ? '여성' : '남성'}
									</li>
									<li className="flex items-center mt-1 text-sm">
										{user.weight.name} 급
										<Icon icon="mdi:dot" />
										{user.weight.min_weight} kg 미만
									</li>
									<li className="flex items-center">
										<span className="text-sm">경력 {user.years} 년</span>
										{user.last_login ? <Icon icon="mdi:dot" /> : ''}
										<span className="text-sm">{user.last_login ? `${foramtDate(user.last_login)} 접속` : ''} </span>
									</li>
								</ul>
							</div>
							<button className="btn btn-primary">채팅하기</button>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
