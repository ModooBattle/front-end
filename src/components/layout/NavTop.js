import { styled } from 'styled-components';

const StyledNavTop = styled.section`
	color: #fff;
	padding: 16px 24px;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* flex: 1 0 0; */
`;

const NavTop = ({ title }) => {
	return <StyledNavTop>{title}</StyledNavTop>;
};

export default NavTop;
