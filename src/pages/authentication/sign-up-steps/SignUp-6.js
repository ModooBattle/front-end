import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { useNavigate } from 'react-router-dom';
//
import NavTop from '../../../layout/NavTop';
import Title from '../../../components/typography/Title';

export default function SignUp6() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [weightList, setWeightList] = useState([]);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const getSportsList = async () => {
		try {
			await axios
				.get(`sport/weight/list`, {
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
		<div className="flex flex-col justify-between h-full">
			<section>
				<NavTop title="회원가입" />
				<Title>체급을 알려주세요</Title>
				<section className="radio-pick-experience mt-[32px]">
					<select className="select select-primary w-full" onChange={handleSelectWeightList}>
						<option disabled selected>
							선택 해 주세요.
						</option>
						{weightList.map((data, index) => (
							<option key={index} value={data.id}>
								{data.name}
							</option>
						))}
					</select>
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
