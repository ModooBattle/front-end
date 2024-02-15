import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import { useRecoilState } from 'recoil';
import useAxios from '../../useAxios';
import { userInfoAtom } from '../../atom';
import { useNavigate } from 'react-router-dom';
//sweetalert2
import Swal from 'sweetalert2';

const StyledNavTop = styled.section`
	color: #fff;
	padding: 16px 0px;
	font-size: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	/* flex: 1 0 0; */
`;

const NavTop = ({ title }) => {
	const pAxios = useAxios();
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
	const location = useNavigate();
	const handleLogout = () => {
		pAxios
			.post(`/user/logout`)
			.then((res) => {
				if (res.status === 200) {
					Swal.fire({
						icon: 'info',
						title: '정보',
						text: `로그아웃 되었습니다. 로그인 화면으로 이동 합니다.`,
						confirmButtonText: '확인'
					}).then(() => {
						location(`/login`);
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<StyledNavTop>
			<button className="m-1 btn btn-sm">{/* <Icon icon="material-symbols:menu" style={{ fontSize: '18px' }}></Icon> */}</button>
			<h2 className="ml-auto">{title}</h2>
			<details className="dropdown dropdown-end ml-auto">
				<summary className="m-1 btn btn-sm">
					<Icon icon="material-symbols:menu" style={{ fontSize: '18px' }}></Icon>
				</summary>
				<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
					<li onClick={handleLogout}>
						<a>로그아웃</a>
					</li>
				</ul>
			</details>
		</StyledNavTop>
	);
};

export default NavTop;
