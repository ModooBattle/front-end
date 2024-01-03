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
export default function SignUp6() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [year, setYear] = useState('');

	const handleNextBtn = () => {
		navigate('/sign-up-5');
	};

	const handleSelectYear = (e) => {
		setYear(e.target.value);
	};

	const arrYears = () => {
		let arr = [];
		for (let i = 1; i <= 10; i++) {
			arr.push(
				<option key={i} value={i}>
					{i} 년
				</option>
			);
		}
		return arr;
	};

	useEffect(() => {
		if (year !== '') {
			setActive(true);
		}
	}, [year]);

	console.log(year);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>체급을 알려주세요</Title>
				<section className="radio-pick-experience mt-[32px]">
					<CustomSelect className="select select-bordered w-full max-w-xs custom-select" onChange={handleSelectYear}>
						<option value="">선택 해 주세요</option>
						{arrYears()}
						<option value={11}>10 년 이상</option>
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
