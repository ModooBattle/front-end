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
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>고르신 종목의 경력을 알려 주세요.</Title>
				<section className="radio-pick-experience mt-[32px]">
					<CustomSelect className="select select-bordered w-full max-w-xs custom-select" onChange={handleSelectYear}>
						<option value="">선택 해 주세요</option>
						{arrYears()}
						<option value={10}>10 년 이상</option>
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
