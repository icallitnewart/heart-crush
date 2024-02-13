import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Logo from '../../components/Logo';
import BackgroundLayer from '../../components/BackgroundLayer';

const appearAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-20%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;

const disappearAnimation = keyframes`
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(-20%);
	}
`;

interface ContainerPropsType {
	$isAppear: boolean;
}

const Container = styled.div<ContainerPropsType>`
	animation: ${({ $isAppear }) => $isAppear && appearAnimation} 800ms forwards;
`;

const AlertText = styled.h2`
	position: relative;
	text-align: center;

	font-family: var(--main-font);
	font-size: 5em;
	letter-spacing: 1px;
	color: var(--sub-color-purple);
	-webkit-text-stroke: 1.3px #333;

	&::after {
		position: absolute;
		left: 50%;
		bottom: 0%;
		z-index: -1;
		transform: translateX(calc(-50% + 4px));
		content: 'Finish';
		display: inline-block;
		clear: both;

		color: var(--sub-color-blue);
		-webkit-text-stroke: 1.3px #333;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
	}
`;

function EndingAlertPopup(): React.ReactElement {
	const [isAppear, setIsAppear] = useState(true);

	return (
		<BackgroundLayer opacity={0}>
			<Container $isAppear={isAppear}>
				<Logo fontSize="3em" textStroke={1.2} shouldTextShadow />
				<AlertText>Finish</AlertText>
			</Container>
		</BackgroundLayer>
	);
}

export default EndingAlertPopup;
