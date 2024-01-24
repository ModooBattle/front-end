import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { styled } from 'styled-components';
import TextField from '@mui/material/TextField';
import { withStyles } from '@material-ui/core/styles';
// third party - from validation
import * as Yup from 'yup';
import { Formik, ErrorMessage, useFormikContext } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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

const CustomTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#90908E'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#7480FF'
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#90908E'
		},
		'& .MuiFormLabel-root': {
			color: '#90908E'
		},
		'&.MuiFormControl-root': {
			display: 'flex',
			width: '100%'
		},
		'&': {
			backgroundColor: 'transparent'
		}
	}
})(TextField);

export default function SignUp1() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const setUserRegisterInfo = useSetRecoilState(userRegisterInfoAtom);
	const MySwal = withReactContent(Swal);
	const [randomNickName, setRandomNickName] = useState('');

	const handleNextBtn = () => {
		navigate('/sign-up-2');
	};

	const getRandomNickname = async () => {
		try {
			await axios.get(`user/random-nickname`).then((result) => {
				const { status, data } = result;
				if (status === 200) {
					setRandomNickName(data.nickname);
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	// const RandomNicknameButton = ({ values }) => {
	// 	useEffect(() => {
	// 		values.username = randomNickName;
	// 	}, [randomNickName]);

	// 	return (
	// 		<button type="button" onClick={getRandomNickname} className="btn btn-neutral" disabled={active}>
	// 			랜덤 닉네임 생성
	// 		</button>
	// 	);
	// };

	const RandomNicknameButton = useCallback(
		({ values }) => {
			values.username = randomNickName;
			return (
				<button type="button" onClick={getRandomNickname} className="btn btn-neutral" disabled={active}>
					랜덤 닉네임 생성
				</button>
			);
		},
		[randomNickName]
	);

	// useEffect(() => {
	// 	getRandomNickname();
	// }, []);

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop title="회원가입" />
				<Title>
					안녕하세요!
					<br />
					닉네임이 무엇인가요?
				</Title>
				<div className="mt-[32px]">
					<Formik
						initialValues={{
							username: ''
						}}
						validationSchema={Yup.object().shape({
							username: Yup.string()
								.matches(/^[가-힣a-z0-9]{3,15}$/, '사용 불가능한 닉네임 입니다.')
								.min(1, '1글자 이상으로 작성 해주세요.')
								.max(15, '15글자 이내로 작성 해 주세요.')
								.required('필수로 작성 해 주세요.')
						})}
						onSubmit={async (values) => {
							try {
								await axios
									.get(`user/signup`, {
										params: {
											username: values.username
										}
									})
									.then((result) => {
										const { status, data } = result;
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
													setUserRegisterInfo((prev) => ({ ...prev, username: values.username }));
												} else if (result.isDenied) {
													Swal.fire('실패', '닉네임을 다시 지정 해 주세요.');
													setActive(false);
												}
											});
										}
									});
							} catch (error) {
								if (error.response.status === 400) {
									console.log('중복되는 닉네임입니다. 다시 설정 해 주세요.');
								}
							}
						}}
						// enableReinitialize
					>
						{({ values, handleChange, handleSubmit, isSubmitting }) => (
							<section>
								<form onSubmit={handleSubmit} className="flex items-end mt-2">
									<CustomTextField
										id="nickname"
										name="username"
										label="닉네임"
										variant="standard"
										value={values.username}
										onChange={handleChange}
										disabled={active}
										inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
									/>
									<RandomNicknameButton values={values} />
									<button className="btn btn-primary ml-2" type="submit" disabled={active ? active : isSubmitting}>
										중복검사
									</button>
								</form>
								<ErrorMessage name="username" component="div" className="mt-2 text-error" />
							</section>
						)}
					</Formik>
				</div>
			</section>
			<section>
				<BtnFull className="btn btn-primary disabled:#fff" disabled={!active} onClick={handleNextBtn}>
					다음
				</BtnFull>
			</section>
		</SignUpLayout>
	);
}
