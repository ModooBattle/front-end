import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from './BottomNav';
import { useLocation } from 'react-router-dom';

function Layout() {
	const location = useLocation();
	const splitPathName = location.pathname.split('/');

	return (
		<MainLayout>
			<div className="contents_container">
				<section>
					<div className="content_wrap my-4 mx-5">
						<Outlet />
					</div>
					{splitPathName[1] === 'oauth' || splitPathName[1] === '404' ? '' : <BottomNav />}
				</section>
			</div>
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

		> section {
			height: 100%;
			display: flex;
			flex-direction: column;

			> .content_wrap {
				height: calc(100% - 97px);
			}
		}
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
