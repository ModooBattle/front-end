import { useLocation, useParams } from 'react-router-dom';
import NavTop from '../../components/layout/NavTop';

export default function JymListDetail() {
	const location = useLocation();
	const params = useParams();
	console.log(params);
	const jymInfo = location.state.row;

	return (
		<section className="flex flex-col h-full">
			<NavTop title="모두의 대결" />
			<ul>
				<li>{jymInfo.name}</li>
				<li>{jymInfo.address}</li>
				<li>{jymInfo.distance} km</li>
				<li>{jymInfo.users.length} 명</li>
			</ul>
			<ul>
				{jymInfo.users.map((user) => (
					<li>{user.username}</li>
				))}
			</ul>
		</section>
	);
}
