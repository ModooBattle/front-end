import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
//
import { ReactComponent as WomanDefault } from '../../../asset/images/female.svg';
import { ReactComponent as ManDefault } from '../../../asset/images/male.svg';
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

export default function SignUp2() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const handleNextBtn = () => {
		navigate('/sign-up-3');
	};

	const handleSelectFemale = (e) => {
		setUserRegisterInfo((prev) => ({ ...prev, gender: e.target.value }));
	};

	useEffect(() => {
		if (userRegisterInfo.gender !== '') {
			setActive(true);
		}
	}, [userRegisterInfo.gender]);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop title="회원가입" />
				<Title>성별을 알려주세요</Title>
				<section className="radio-pick-gender flex mt-[32px]">
					<label className="basis-1/2 flex flex-col items-center" name="gender" onChange={handleSelectFemale}>
						<input type="radio" name="gender" value="M" />
						<ManDefault />
						<h3 className="text-center text-xl mt-[12px]">남성</h3>
					</label>
					<label className="basis-1/2 flex flex-col items-center" name="gender" onChange={handleSelectFemale}>
						<input type="radio" name="gender" value="F" />
						<WomanDefault />
						<h3 className="text-center text-xl mt-[12px]">여성</h3>
					</label>
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
