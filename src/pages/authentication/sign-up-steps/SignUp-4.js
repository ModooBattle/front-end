import { useEffect, useState } from 'react';
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

const CustomLabel = styled.label`
	border: 1px solid red;
	cursor: pointer;
`;
export default function SignUp3() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [age, setAge] = useState('');

	const handleNextBtn = () => {
		navigate('/sign-up-4');
	};

	const handleSelectAge = (e) => {
		setAge(e.target.value);
	};

	useEffect(() => {
		if (age !== '') {
			setActive(true);
		}
	}, [age]);

	console.log(age);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>대결 하려는 종목이 무엇인가요?</Title>
				<section className="radio-pick-age flex mt-[32px]">
					<CustomLabel className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectAge}>
						<input type="radio" name="age" value="10" />
						<h3 className="text-center text-xl mt-[12px]">복싱</h3>
					</CustomLabel>
					<CustomLabel className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectAge}>
						<input type="radio" name="age" value="20" />
						<h3 className="text-center text-xl mt-[12px]">킥복싱</h3>
					</CustomLabel>
					<CustomLabel className="basis-1/2 flex flex-col items-center" name="age" onChange={handleSelectAge}>
						<input type="radio" name="age" value="30" />
						<h3 className="text-center text-xl mt-[12px]">주짓수</h3>
					</CustomLabel>
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
