import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userRegisterInfoAtom } from '../../../atom';
import { styled } from 'styled-components';
import TextField from '@mui/material/TextField';
import { withStyles } from '@material-ui/core/styles';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useNavigate } from 'react-router-dom';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b577134208f1052dcfc596730187778f" />;

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

export default function SignUp1(...props) {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [userRegisterInfo, setUserRegisterInfo] = useRecoilState(userRegisterInfoAtom);

	const handleNextBtn = () => {
		navigate('/sign-up-2');
	};

	return (
		<SignUpLayout className="flex flex-col justify-between">
			<section>
				<NavTop>회원가입</NavTop>
				<Title>
					거의 다 왔어요!
					<br />
					우리집 주소를 알려주세요
				</Title>
				<div className="mt-[32px]">
					<CustomTextField
						id="nicname"
						name="username"
						label="우리집 주소"
						variant="standard"
						disabled={active}
						inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
					/>
					<Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '360px' }}>
						<MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
							<div style={{ color: '#000' }}>Hello World!</div>
						</MapMarker>
					</Map>
					<button className="btn btn-primary ml-2">우편번호 찾기</button>
					{/* Open the modal using document.getElementById('ID').showModal() method */}
					<button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>
						open modal
					</button>
					<dialog id="my_modal_2" className="modal">
						<div className="modal-box" />
						<form method="dialog" className="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>
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
