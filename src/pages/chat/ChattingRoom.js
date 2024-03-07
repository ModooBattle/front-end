import { useRecoilState } from 'recoil';
import { chatTargetInfoAtom } from '../../atom';

import { Icon } from '@iconify/react';
import useAxios from '../../useAxios';

import NavTop from '../../layout/NavTop';
import Chatting from './Chatting';
import { useEffect, useState } from 'react';

export default function ChattingRoom() {
	const pAxios = useAxios();
	const [chatTargetInfo, setChatTargetInfo] = useRecoilState(chatTargetInfoAtom);
	const [chatInput, setChatInput] = useState('');

	const handleChatInput = (data) => {
		console.log(data.target.value);
		setChatInput(data.target.value);
	};

	const handleSendBtn = () => {
		setChatInput('');
		sendingChat(chatInput);
	};

	const sendingChat = async (chatInput) => {
		console.log(chatInput);
		try {
			await pAxios.post(`/chat/detail`, { receiver: chatTargetInfo.receiverId, content: chatInput }).then((result) => {
				if (result.status === 200) {
					console.log(result);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	console.log(chatTargetInfo);
	return (
		<section>
			<NavTop title={chatTargetInfo.receiverName} />
			<div className="h-full flex flex-col">
				{chatTargetInfo.content === '' ? (
					<article className="flex flex-col items-center justify-center">
						<div className="mt-28">
							<img src="/images/images/bg-chat.svg" />
						</div>
						<h5 className="text-center text-white text-xl mt-6">채팅을 시작 해 보세요.</h5>
						<p className="text-center mt-2">
							비방 • 비하 • 욕설 사용 시<br /> 신고하기 기능을 통해 이용이 제한 될 수 있어요 !
						</p>
					</article>
				) : (
					// 채팅방
					<Chatting className="h-full flex flex-col" />
				)}
				{/* 채팅 입력 폼 */}
				<article
					className="flex justify-center items-center px-4"
					style={{ position: 'absolute', bottom: '38px', width: '100%', left: '0' }}
				>
					<input
						type="text"
						placeholder="입력 해 주세요."
						className="input input-bordered input-primary w-full max-w-xs"
						onChange={handleChatInput}
						value={chatInput}
					/>
					<button className="btn btn-primary ml-2" onClick={handleSendBtn}>
						<Icon icon="mdi:send" style={{ transform: 'rotate(-90deg)', fontSize: '22px', color: '#f4f4f4' }} />
					</button>
				</article>
			</div>
		</section>
	);
}
