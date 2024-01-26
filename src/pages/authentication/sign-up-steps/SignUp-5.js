import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { useNavigate } from 'react-router-dom';
//
import NavTop from '../../../components/layout/NavTop';
import Title from '../../../components/typography/Title';

export default function SignUp3() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const handleNextBtn = () => {
		navigate('/sign-up-6');
	};

	const handleSelectYear = (e) => {
		setUserRegisterInfo((prev) => ({ ...prev, years: Number(e.target.value) }));
	};

	const arrYears = () => {
		let arr = [];
		for (let i = 1; i <= 9; i++) {
			arr.push(
				<option key={i} value={i}>
					{i} 년
				</option>
			);
		}
		return arr;
	};

	useEffect(() => {
		if (userRegisterInfo.years !== null) {
			setActive(true);
		}
	}, [userRegisterInfo.years]);

	return (
		<div className="flex flex-col justify-between h-full">
			<section>
				<NavTop title="회원가입" />
				<Title>고르신 종목의 경력을 알려 주세요.</Title>
				<section className="radio-pick-experience mt-[32px]">
					<select className="select select-primary w-full" onChange={handleSelectYear}>
						<option disabled selected>
							선택 해 주세요.
						</option>
						{arrYears()}
						<option value={10}>10 년 이상</option>
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
