import React, { useCallback } from 'react';
import useAxios from '../../useAxios';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../atom';
//
import { Icon } from '@iconify/react';
import NavTop from '../../layout/NavTop';
import KakaoMap from './KakaoMap';
import CustomTextField from '../../components/form/CustomTextField';
import JymList from './JymList';

export default function Login() {
	const pAxios = useAxios();
	const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
	const [open, setOpen] = useState(false);
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

	const handleModalOpen = () => {
		setOpen(true);
	};
	const handleModalClose = () => {
		setOpen(false);
	};

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

	const handleUserLocation = async () => {
		try {
			await pAxios.post(`/user/current-location`, selectPlace).then((result) => {
				console.log(result.status);
				if (result.status === 200) {
					setUserInfo((prev) => ({ ...prev, user: { current_location: selectPlace.address } }));
					alert('설정 되었습니다.');
					setOpen(false);
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
				{userInfo.user.current_location === null || userInfo.user.current_location === undefined ? (
					<button className="btn btn-sm btn-neutral mr-2" onClick={handleModalOpen}>
						<Icon icon="teenyicons:location-outline"></Icon>
						나의 위치 등록
					</button>
				) : (
					<button className="btn btn-sm btn-neutral mr-2" onClick={handleModalOpen}>
						<Icon icon="teenyicons:location-outline"></Icon>
					</button>
				)}
				{userInfo.user.current_location === null || userInfo.user.current_location === undefined ? (
					<h3>나의 위치를 등록 해주세요</h3>
				) : (
					<h3>{userInfo.user.current_location}</h3>
				)}
			</article>
			{/* modal */}
			<dialog id="my_modal_3" className="modal" open={open}>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>
							✕
						</button>
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
			<JymList userCurrentLocation={userInfo.user.current_location} />
		</div>
	);
}
