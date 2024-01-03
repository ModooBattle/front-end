import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
//
import { ReactComponent as Boxing } from '../../../asset/images/boxing.svg';
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

const CustomLabel = styled.label`
	cursor: pointer;
	padding: 16px;
	background-color: #373735;
	border-radius: 8px;
	flex-basis: 50%;
	min-height: 118px;
`;
export default function SignUp4() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [sportsList, setSportsList] = useState([]);
	const [sport, setSport] = useRecoilState(userRegisterInfoAtom);

	const getSportsList = async () => {
		try {
			await axios.get(`https://121.140.7.121:1444/api/sport/sports/list`).then((result) => {
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
		console.log(e);
		setSport((prev) => ({ ...prev, gym: { ...prev.gym, sport: e.target.value } }));
	};

	useEffect(() => {
		getSportsList();
	}, []);

	useEffect(() => {
		if (sport !== '') {
			setActive(true);
		}
	}, [sport]);

	console.log(sport);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>대결 하려는 종목이 무엇인가요?</Title>
				<section className="radio-pick-sports grid grid-cols-2 gap-[24px] mt-[32px]">
					{sportsList.map((data, index) => (
						<CustomLabel key={index} className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectSports}>
							<input type="radio" name="age" value={data.id} />
							<h3 className="text-xl w-full w-full h-full">{data.name}</h3>
							<div className="flex justify-end w-full">
								<Boxing />
							</div>
						</CustomLabel>
					))}
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
