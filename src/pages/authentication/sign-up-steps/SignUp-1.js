import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';

// third party - from validation
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//
import NavTop from '../../../components/layout/NavTop';
import CustomTextField from '../../../components/form/CustomTextField';
import Title from '../../../components/typography/Title';

export default function SignUp1() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const setUserRegisterInfo = useSetRecoilState(userRegisterInfoAtom);
	const MySwal = withReactContent(Swal);

	const handleNextBtn = () => {
		navigate('/sign-up-2');
	};

	const RandomNicknameButton = ({ setFieldValue }) => {
		const getRandomNickname = async () => {
			try {
				await axios.get(`user/random-nickname`).then((result) => {
					const { status, data } = result;
					if (status === 200) {
						setFieldValue('username', data.nickname);
					}
				});
			} catch (e) {
				console.log(e);
			}
		};

		return (
			<button type="button" onClick={getRandomNickname} className="btn btn-neutral ml-2" disabled={active}>
				랜덤 닉네임 생성
			</button>
		);
	};

	return (
		<div className="flex flex-col justify-between h-full">
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
					>
						{({ values, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
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
									<RandomNicknameButton setFieldValue={setFieldValue} />
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
				<button className="btn btn-block btn-primary" disabled={!active} onClick={handleNextBtn}>
					다음
				</button>
			</section>
		</div>
	);
}
