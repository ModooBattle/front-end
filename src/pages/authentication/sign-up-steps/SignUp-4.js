import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
//
import NavTop from '../../../components/layout/NavTop';

const SignUpLayout = styled.section`
	height: 100%;
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

const CustomLabel = styled.label`
	cursor: pointer;
	padding: 16px;
	background-color: #14191e;
	border-radius: 8px;
	flex-basis: 50%;
	min-height: 118px;
`;
export default function SignUp4() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [sportsList, setSportsList] = useState([]);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const sportsIcons = ['/images/icons/boxing.svg', '/images/icons/jujitsu.svg', '/images/icons/kickboxing.svg'];

	const getSportsList = async () => {
		try {
			await axios.get(`sport/sports/list`).then((result) => {
				setSportsList(result.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleNextBtn = () => {
		navigate('/sign-up-5');
	};

	const handleSelectSports = (e) => {
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, sport: Number(e.target.value) } }));
	};

	useEffect(() => {
		getSportsList();
	}, []);

	useEffect(() => {
		if (userRegisterInfo.gym.sport !== null) {
			setActive(true);
		}
	}, [userRegisterInfo.gym.sport]);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop title="회원가입" />

				<Title>대결 하려는 종목이 무엇인가요?</Title>
				<section className="radio-pick-sports grid grid-cols-2 gap-[24px] mt-[32px]">
					{sportsList.map((data, index) => (
						<CustomLabel key={index} className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectSports}>
							<input type="radio" name="age" value={data.id} />
							<h3 className="text-xl w-full h-full">{data.name}</h3>
							<div className="flex justify-end w-full">
								{/* <Boxing /> */}
								<img src={sportsIcons[index]} alt={data.name} className={'sport-' + index} />
							</div>
						</CustomLabel>
					))}
				</section>
			</section>
			<section>
				<BtnFull className="btn btn-primary" disabled={!active} onClick={handleNextBtn}>
					다음
				</BtnFull>
			</section>
		</SignUpLayout>
	);
}
