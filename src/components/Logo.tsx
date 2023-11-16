import React from 'react';
import styled from 'styled-components';

const Container = styled.h1`
	position: relative;
	flex-grow: 1;
	padding-right: 5px;
	margin-bottom: 10px;

	font-family: var(--main-font);
	font-size: 1.9em;
	letter-spacing: 1px;

	&::after {
		position: absolute;
		top: 2px;
		left: 2px;
		content: 'Heart Crush';
		display: inline-block;
		clear: both;

		color: var(--sub-color-purple);
		-webkit-text-stroke: 0.8px #333;
	}
`;

const LogoText = styled.span`
	position: relative;
	z-index: 1;
	display: inline-block;
	height: 100%;

	color: var(--main-color-yellow);
	-webkit-text-stroke: 0.8px #333;
`;

function Logo(): React.ReactElement {
	return (
		<Container>
			<LogoText>Heart Crush</LogoText>
		</Container>
	);
}

export default Logo;
