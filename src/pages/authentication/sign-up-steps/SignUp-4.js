import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { useNavigate } from 'react-router-dom';
//
import NavTop from '../../../layout/NavTop';
import Title from '../../../components/typography/Title';
import CustomLabel from '../../../components/form/CustomLabel';

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
		<div className="flex flex-col justify-between h-full">
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
				<button className="btn btn-block btn-primary" disabled={!active} onClick={handleNextBtn}>
					다음
				</button>
			</section>
		</div>
	);
}
