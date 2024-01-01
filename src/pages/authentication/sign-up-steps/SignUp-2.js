import { useState } from 'react';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
//
import { ReactComponent as WomanDefault } from '../../../asset/images/woman-default.svg';
import { ReactComponent as ManDefault } from '../../../asset/images/man-default.svg';

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

export default function SignUp1() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [nickname, setNickname] = useState('');
	const MySwal = withReactContent(Swal);

	const handleNextBtn = () => {
		navigate('/sign-up-2');
	};

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				{' '}
				<NavTop>회원가입</NavTop>
				<Title>성별을 알려주세요</Title>
				<section className="flex mt-[32px]">
					<div className="basis-1/2">
						<WomanDefault />
						<h3 className="text-center text-xl mt-[12px]">여성</h3>
					</div>
					<div className="basis-1/2">
						<ManDefault />
						<h3 className="text-center text-xl mt-[12px]">남성</h3>
					</div>
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
