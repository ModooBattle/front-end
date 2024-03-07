import { useRef, useEffect } from 'react';
import useAxios from '../../useAxios';

export default function Chatting() {
	const pAxios = useAxios();
	const chatRoomRef = useRef(null);

	const fetchChatDetail = async () => {
		try {
			await pAxios.get('/chat/detail', { chatroom_id: null, page_no: 0, length: 10 }).then((result) => {
				console.log(result);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// when load page scroll to bottom
		// fetchChatDetail()
		chatRoomRef.current.scrollTo(0, chatRoomRef.current.scrollHeight);
	}, []);

	return (
		<div ref={chatRoomRef} style={{ overflowY: 'scroll', maxHeight: '566px' }}>
			<div className="chat chat-start">
				<div className="chat-bubble">
					It's over Anakin, <br />I have the high ground.
				</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
			<div className="chat chat-end">
				<div className="chat-bubble">You underestimate my power!</div>
			</div>
		</div>
	);
}
