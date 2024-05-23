import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveToLeftAnimation = keyframes`
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: -500px 0;
	}
`;

const Container = styled.div`
	position: relative;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	max-height: 1000px;

	background-color: var(--sub-color-blue);
	background-image: url(${process.env.PUBLIC_URL}/assets/images/cloud.svg);
	background-repeat: repeat;
	background-size: auto;
	animation: ${moveToLeftAnimation} 10000ms linear infinite;
`;

interface ScreenContainerPropsType {
	children: React.ReactNode;
}

function ScreenContainer({
	children,
}: ScreenContainerPropsType): React.ReactElement {
	return <Container id="screen-container">{children}</Container>;
}

export default ScreenContainer;
