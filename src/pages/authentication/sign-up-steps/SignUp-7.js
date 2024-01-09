import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { styled } from 'styled-components';
import TextField from '@mui/material/TextField';
import { withStyles } from '@material-ui/core/styles';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useNavigate } from 'react-router-dom';

import TestMap from '../KakaoMap';

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

const CustomTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#90908E'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#FF9501'
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
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const handleKeyword = (e) => {
		setKeyword(e.target.value);
	};

	const [info, setInfo] = useState();
	// const [map, setMap] = useState();

	//--------------------------------------------------

	// 입력 폼 변화 감지하여 입력 값 관리
	const [Value, setValue] = useState('');
	// 제출한 검색어 관리
	const [Keyword, setKeyword] = useState('');
	const [selectPlace, setSelectPlace] = useState('');

	// 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
	const keywordChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	// 제출한 검색어 state에 담아주는 함수
	const submitKeyword = (e) => {
		e.preventDefault();
		setKeyword(Value);
	};

	// 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
	const valueChecker = () => {
		if (Value === '') {
			alert('검색어를 입력해주세요.');
		}
	};

	// const getSearchInfo = (title, info, gymAddress) => {
	const getSearchInfo = ({ title, info, gymAddress }) => {
		setSelectPlace(title);
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, name: title } }));
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, latitude: info.La } }));
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, longitude: info.Ma } }));
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, address: gymAddress } }));
	};

	useEffect(() => {
		if (userRegisterInfo.gym.address !== '') {
			setActive(true);
		}
	}, [userRegisterInfo.gym.address]);

	console.log(userRegisterInfo);

	const signUp = async () => {
		try {
			await axios
				.post(`https://121.140.7.121:1444/api/user/signup`, null, {
					params: userRegisterInfo
				})
				.then((result) => {
					console.log(result);
					if (result.status === 201) {
						navigate('/sign-up-8');
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>
					거의 다 왔어요!
					<br />
					이용 하시는 체육관을 선택 해 주세요!
				</Title>
				<div className="mt-[32px]">
					<div className="landing-page">
						<section className="landing-page__inner">
							<div className="search-form-container mb-2">
								<form className="search-form" onSubmit={submitKeyword}>
									<label htmlFor="place" className="flex items-end">
										<CustomTextField
											id="movie-title"
											name="place"
											label="우리집 주소"
											variant="standard"
											onChange={keywordChange}
											disabled={active}
											inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
											required
										/>

										<div className="btn-box ml-2">
											<input className="btn btn-primary btn-sm" type="submit" value="검색" onClick={valueChecker} />
										</div>
									</label>
								</form>
							</div>
							{/* 제출한 검색어 넘기기 */}
							<TestMap searchKeyword={Keyword} getSearchInfo={getSearchInfo} />
						</section>
					</div>
				</div>
			</section>
			<section>
				<CustomTextField
					id="movie-title"
					name="place"
					label="선택한 장소"
					variant="standard"
					value={selectPlace}
					inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
					required
				/>
				<BtnFull className="btn btn-primary" disabled={!active} onClick={signUp}>
					다음
				</BtnFull>
			</section>
		</SignUpLayout>
	);
}
