import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
//
const SignUpLayout = styled.section`
	color: #fff;
	height: 100%;
`;

const NavTop = styled.section`
	padding: 16px 24px;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 0 0;
`;

const Title = styled.h3`
	padding-top: 44px;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 36px */
`;

const BtnFull = styled.button`
	width: 100%;
`;

const CustomSelect = styled.select`
	background: #373735;
`;
export default function SignUp6() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [weightList, setWeightList] = useState([]);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const getSportsList = async () => {
		try {
			await axios
				.get(`https://121.140.7.121:1444/api/sport/weight/list`, {
					params: { sport_id: userRegisterInfo.gym.sport, gender: userRegisterInfo.gender }
				})
				.then((result) => {
					setWeightList(result.data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleNextBtn = () => {
		navigate('/sign-up-7');
	};

	const handleSelectWeightList = (e) => {
		setUserRegisterInfo((prev) => ({ ...prev, weight: Number(e.target.value) }));
	};

	useEffect(() => {
		if (userRegisterInfo.weight !== null) {
			setActive(true);
		}
	}, [userRegisterInfo.weight]);

	useEffect(() => {
		getSportsList();
	}, []);

	console.log(userRegisterInfo);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>체급을 알려주세요</Title>
				<section className="radio-pick-experience mt-[32px]">
					<CustomSelect className="select select-bordered w-full max-w-xs custom-select" onChange={handleSelectWeightList}>
						<option value="">선택 해 주세요</option>
						{weightList.map((data, index) => (
							<option key={index} value={data.id}>
								{data.name}
							</option>
						))}
						<option value={11}>10 년 이상</option>
					</CustomSelect>
				</section>
			</section>
			<section>
				<BtnFull className="btn btn-primary disabled:#fff" disabled={!active} onClick={handleNextBtn}>
					다음
				</BtnFull>
			</section>
		</SignUpLayout>
	);
}
