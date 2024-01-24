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
`;

export default function SignUp3() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const handleNextBtn = () => {
		navigate('/sign-up-4');
	};

	const handleSelectAge = (e) => {
		setUserRegisterInfo((prev) => ({ ...prev, age: e.target.value }));
	};

	useEffect(() => {
		if (userRegisterInfo.age !== '') {
			setActive(true);
		}
	}, [userRegisterInfo.age]);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop title="회원가입" />
				<Title>연령대를 알려주세요</Title>
				<section className="radio-pick-age flex flex-col mt-[32px]">
					<CustomLabel className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectAge}>
						<input type="radio" name="age" value="10" />
						<h3 className="text-xl">10대</h3>
					</CustomLabel>

					<CustomLabel className="basis-1/2 flex flex-col items-center my-[16px]" name="age" onChange={handleSelectAge}>
						<input type="radio" name="age" value="20" />
						<h3 className="text-xl">20대</h3>
					</CustomLabel>
					<CustomLabel className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectAge}>
						<input type="radio" name="age" value="30" />
						<h3 className="text-xl">30대 이상</h3>
					</CustomLabel>
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
