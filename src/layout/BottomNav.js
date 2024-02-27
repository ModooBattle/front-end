import { Icon } from '@iconify/react';

export default function BottomNav() {
	return (
		<div className="btm-nav relative mt-auto bg-base-200">
			<button className="active">
				<Icon icon="mdi:comment-edit-outline" style={{ fontSize: '24px' }} />
				<span className="btm-nav-label text-sm" style={{ lineHeight: 'unset' }}>
					커뮤니티
				</span>
			</button>
			<button>
				<Icon icon="mdi:home-variant-outline" style={{ fontSize: '24px' }} />
				<span className="btm-nav-label text-sm" style={{ lineHeight: 'unset' }}>
					체육관
				</span>
			</button>
			<button>
				<Icon icon="mdi:chat-outline" style={{ fontSize: '24px' }} />
				<span className="btm-nav-label text-sm" style={{ lineHeight: 'unset' }}>
					채팅
				</span>
			</button>
		</div>
	);
}
