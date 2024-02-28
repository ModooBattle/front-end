import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname.split('/')[1];

	const [menu, setMenu] = useState({
		community: null,
		jym: null,
		chat: null
	});

	const activeUrl = (path) => {
		switch (path) {
			case 'home':
				setMenu((prev) => ({ ...prev, jym: true }));
		}
	};

	useEffect(() => {
		activeUrl(path);
	}, [path]);

	console.log(path);

	return (
		<div className="btm-nav relative bg-base-200">
			<button className={menu.community ? 'active' : ''}>
				<Icon icon="mdi:comment-edit-outline" style={{ fontSize: '24px' }} />
				<span className="btm-nav-label text-sm" style={{ lineHeight: 'unset' }}>
					커뮤니티
				</span>
			</button>
			<button className={menu.jym ? 'active' : ''} onClick={() => navigate(`/home`)}>
				<Icon icon="mdi:home-variant-outline" style={{ fontSize: '24px' }} />
				<span className="btm-nav-label text-sm" style={{ lineHeight: 'unset' }}>
					체육관
				</span>
			</button>
			<button className={menu.chat ? 'active' : ''}>
				<Icon icon="mdi:chat-outline" style={{ fontSize: '24px' }} />
				<span className="btm-nav-label text-sm" style={{ lineHeight: 'unset' }}>
					채팅
				</span>
			</button>
		</div>
	);
}
