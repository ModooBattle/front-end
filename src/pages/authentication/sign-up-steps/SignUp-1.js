import { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import TextField from '@mui/material/TextField';
// third party - from validation
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

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

	const CheckDuplication = async () => {
		setActive(true);
		try {
			await axios
				.get(`https://121.140.7.121:1444/api/user/signup`, {
					params: {
						username: nickname
					}
				})
				.then((result) => {
					const { status, data } = result;
					console.log(status);
					if (status === 200) {
						MySwal.fire({
							title: <p>사용 할 수 있는 닉네임입니다. 이 닉네임으로 하시겠습니까?</p>,
							showDenyButton: true,
							showCancelButton: true,
							confirmButtonText: '네',
							denyButtonText: `아니요`
						}).then((result) => {
							if (result.isConfirmed) {
								Swal.fire('성공!', '다음 버튼을 눌러 계속 진행 해 주세요.');
								setActive(true);
							} else if (result.isDenied) {
								Swal.fire('실패', '닉네임을 다시 지정 해 주세요.');
								setActive(false);
							}
						});
					}
				});
		} catch (error) {
			console.log(error);
			if (error.response.status === 400) {
				console.log('중복되는 닉네임입니다. 다시 설정 해 주세요.');
			}
		}
	};

	const handleNextBtn = () => {
		navigate('/sign-up-2');
	};

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				{' '}
				<NavTop>회원가입</NavTop>
				<Title>
					안녕하세요!
					<br />
					닉네임이 무엇인가요?
				</Title>
				<Formik
					initialValues={{
						username: nickname
					}}
					validationSchema={Yup.object().shape({
						username: Yup.string()
							.matches(/^[가-힣a-z0-9]{3,15}$/, '사용 불가능한 닉네임 입니다.')
							.min(1, '1글자 이상으로 작성 해주세요.')
							.max(15, '15글자 이내로 작성 해 주세요.')
							.required('필수로 작성 해 주세요.')
					})}
					onSubmit={CheckDuplication}
					// enableReinitialize
				>
					{({ values, handleChange, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className="flex items-center mt-2">
							<TextField
								id="nicname"
								name="username"
								label="닉네임"
								variant="standard"
								value={values.username}
								onChange={handleChange}
								disabled={active}
								inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
							/>
							<ErrorMessage name="username" component="div" />
							<button className="btn btn-primary" type="submit" disabled={active ? active : isSubmitting}>
								중복검사
							</button>
						</form>
					)}
				</Formik>
			</section>
			<section>
				<BtnFull className="btn btn-primary disabled:#fff" disabled={!active} onClick={handleNextBtn}>
					다음
				</BtnFull>
			</section>
		</SignUpLayout>
	);
}
