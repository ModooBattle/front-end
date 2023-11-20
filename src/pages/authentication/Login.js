import React from 'react';
import { styled } from 'styled-components';

const Title = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes.title};
	color: ${({ theme }) => theme.colors.grey};
`;

export default function Login() {
	return (
		<div className="bg-white">
			<h1>login</h1>
			<Title>dds</Title>
		</div>
	);
}
