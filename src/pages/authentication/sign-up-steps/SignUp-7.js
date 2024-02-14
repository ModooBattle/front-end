import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom, userInfoAtom } from '../../../atom';

import { useNavigate } from 'react-router-dom';
import KaKaoMap from '../KakaoMap';
//
import NavTop from '../../../components/layout/NavTop';
import CustomTextField from '../../../components/form/CustomTextField';
import Title from '../../../components/typography/Title';

export default function SignUp7() {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

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

	const getSearchInfo = ({ title, info, gymAddress }) => {
		setSelectPlace(title);
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, name: title } }));
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, latitude: info.Ma } })); // 위도
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, longitude: info.La } })); // 경도
		setUserRegisterInfo((prev) => ({ ...prev, gym: { ...prev.gym, address: gymAddress } }));
	};

	useEffect(() => {
		if (userRegisterInfo.gym.address !== '') {
			setActive(true);
		}
	}, [userRegisterInfo.gym.address]);

	// console.log(userRegisterInfo);

	const signUp = async () => {
		try {
			await axios.post(`user/signup`, userRegisterInfo).then((result) => {
				if (result.status === 200) {
					setUserInfo((prev) => ({
						...prev,
						access: result.data.access,
						username: result.data.username,
						current_location: result.data.current_location
					})); //엑세스토큰 저장
					navigate('/sign-up-8');
				} else if (result.status === 201) {
					console.log(result);
					console.log('201');
					// navigate('/sign-up-8');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col justify-between h-full">
			<section>
				<NavTop title="회원가입" />
				<Title>
					거의 다 왔어요!
					<br />
					이용 하시는 체육관을 선택 해 주세요!
				</Title>
				<div className="mt-[32px] mb-2">
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
							<KaKaoMap searchKeyword={Keyword} getSearchInfo={getSearchInfo} />
						</section>
					</div>
				</div>
				<CustomTextField
					id="movie-title"
					name="place"
					label="선택한 장소"
					variant="standard"
					value={selectPlace}
					inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
					disabled
					required
				/>
			</section>
			<section>
				<button className="btn btn-block btn-primary" disabled={!active} onClick={signUp}>
					다음
				</button>
			</section>
		</div>
	);
}
