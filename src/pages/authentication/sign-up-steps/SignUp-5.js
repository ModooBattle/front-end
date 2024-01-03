import { useEffect, useState } from 'react';
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

const CustomSelect = styled.select`
	background: #373735;
`;
export default function SignUp3() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [age, setAge] = useState('');

	const handleNextBtn = () => {
		navigate('/sign-up-5');
	};

	const handleSelectAge = (e) => {
		setAge(e.target.value);
	};

	const forTest = () => {
		let arr = [];
		for (let i = 0; i < 10; i++) {
			arr.push(<div>{i}</div>);
		}
		return arr;
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
				<Title>고르신 종목의 경력을 알려 주세요.</Title>
				<section className="radio-pick-experience mt-[32px]">
					{forTest}
					<CustomSelect className="select select-bordered w-full max-w-xs custom-select">
						<option value={i}>{i}년</option>
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
