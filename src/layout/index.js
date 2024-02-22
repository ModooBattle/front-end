import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from './BottomNav';
function Layout() {
	return (
		<MainLayout>
			<div className="contents_container">
				<Outlet />
			</div>
			<BottomNav />
		</MainLayout>
	);
}

export default Layout;

const MainLayout = styled.section`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;

	& > .contents_container {
		width: 100%;
		max-width: 550px;
		height: calc(100% - 10vh);
		background: ${({ theme }) => theme.colors.bgBlack};
		border-radius: 40px;
		// border: 12px solid #fff;
		box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
		position: relative;
		overflow: hidden;
		padding: 24px;
	}
	@media (min-width: 1000px) {
		& > .contents_container {
			max-width: 390px;
			max-height: 800px;
		}
	}

	@media (max-width: 500px) {
		padding: 0;
		& > .contents_container {
			height: 100%;
			border: none;
			margin: 0;
			border-radius: 0px;
		}
	}
`;
