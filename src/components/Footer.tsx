import React from 'react';
import { styled } from 'styled-components';

const Container = styled.footer`
	width: 100%;
	height: 25px;
	text-align: center;
`;

const Copyright = styled.p`
	font-size: 12px;
	font-family: 'Helvetica';
	font-weight: 600;
	color: #c0b8f9;
`;

function Footer(): React.ReactElement {
	return (
		<Container>
			<Copyright>© 2024 Heart Crush. All rights reserved.</Copyright>
		</Container>
	);
}

export default Footer;
