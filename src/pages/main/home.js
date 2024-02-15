import React from 'react';
import useAxios from '../../useAxios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../atom';
//
import { Icon } from '@iconify/react';
import NavTop from '../../components/layout/NavTop';
import KakaoMap from './KakaoMap';
import CustomTextField from '../../components/form/CustomTextField';

export default function Login() {
	const pAxios = useAxios();
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
	const [active, setActive] = useState(false);
	// 입력 폼 변화 감지하여 입력 값 관리
	const [Value, setValue] = useState('');
	// 제출한 검색어 관리
	const [Keyword, setKeyword] = useState('');
	const [selectPlace, setSelectPlace] = useState({
		address: '',
		latitude: '',
		longitude: ''
	});
	const [selectTitle, setSelectTitle] = useState('');

	console.log(userInfo);

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

	const getSearchInfo = ({ title, info, homeAddress }) => {
		setSelectPlace((prev) => ({ ...prev, address: homeAddress, latitude: info.Ma, longitude: info.La }));
		setSelectTitle(title);
	};

	const modal = document.getElementById('my_modal_3');

	const handleUserLocation = async () => {
		try {
			await pAxios.post(`/user/current-location`, selectPlace).then((result) => {
				console.log(result.status);
				if (result.status === 200) {
					setUserInfo((prev) => ({ ...prev, current_location: selectPlace.address }));
					alert('설정 되었습니다.');
					modal.open = false;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col h-full">
			<NavTop title="모두의 대결" />
			<article className="flex items-center justify-end">
				{userInfo.current_location === null ? <h3>정보 없음</h3> : <h3>{userInfo.current_location}</h3>}
				<button className="btn btn-sm btn-neutral ml-2" onClick={() => document.getElementById('my_modal_3').showModal()}>
					<Icon icon="teenyicons:location-outline"></Icon>
					현재 위치 설정
				</button>
			</article>
			<dialog id="my_modal_3" className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
					</form>
					<h3 className="font-bold text-lg">현재 위치를 설정 해 주세요</h3>
					<article>
						<form className="search-form mb-2" onSubmit={submitKeyword}>
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
						<KakaoMap searchKeyword={Keyword} getSearchInfo={getSearchInfo} />
						<div className="flex items-center mt-2">
							<CustomTextField
								id="movie-title"
								name="place"
								variant="standard"
								value={selectTitle}
								inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
								disabled
								required
							/>
							<button className="btn btn-primary ml-2" onClick={handleUserLocation}>
								현재 위치 설정하기
							</button>
						</div>
					</article>
				</div>
			</dialog>
			{/* list */}
			<section></section>
			{/* nav bottom */}
			<div className="btm-nav relative mt-auto">
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					<span className="btm-nav-label">Home</span>
				</button>
				<button className="active">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="btm-nav-label">Warnings</span>
				</button>
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
					<span className="btm-nav-label">Statics</span>
				</button>
			</div>
		</div>
	);
}
