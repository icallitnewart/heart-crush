import React, { useEffect, useRef } from 'react';
import { isIOS, isMobileOnly } from 'react-device-detect';
import styled, { keyframes } from 'styled-components';
import { FaHeart } from 'react-icons/fa';

import Logo from './Logo';

const moveToLeftAnimation = keyframes`
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: -500px 0;
	}
`;

const Background = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: var(--sub-color-lightpink);
	/* #ffe4e4; #ecd8fd; */
`;

const Container = styled.div`
	display: flex;
	max-width: 960px;
	height: 100vh;
	min-height: 800px;
`;

const LogoWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 480px;
	height: 100%;

	h1 {
		text-shadow: 0px 0px 10px var(--sub-color-purple);
	}

	@media ${({ theme }) => theme.tablet} {
		display: none;
	}

	@media ${({ theme }) => theme.mobile} {
		display: none;
	}
`;

const HeartIcon = styled(FaHeart)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50px);
	width: 100%;
	color: var(--sub-color-purple);
	font-size: 90px;
	stroke: #666;
	stroke-width: 7;
	filter: drop-shadow(0px 0px 10px var(--sub-color-purple));
`;

const ScreenWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 480px;
	height: 100%;
	box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);

	background-color: var(--sub-color-blue);
	background-image: url(${process.env.PUBLIC_URL}/assets/images/cloud.svg);
	background-repeat: repeat;
	background-size: auto;
	animation: ${moveToLeftAnimation} 10000ms linear infinite;
`;

const DesktopScreen = styled.div`
	width: 100%;
	height: 100%;
	max-height: 900px;
`;

const MobileScreen = styled.div`
	position: relative;
	width: 100%;
	max-width: 480px;
	height: 100vh;

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
	const screenRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (screenRef.current && isIOS) {
			screenRef.current.style.height = `${window.innerHeight}px`;
		}
	}, []);

	if (isMobileOnly) {
		return (
			<MobileScreen id="screen-container" ref={screenRef}>
				{children}
			</MobileScreen>
		);
	}

	return (
		<Background>
			<Container>
				<LogoWrapper>
					<HeartIcon />
					<Logo fontSize="55px" textStroke={1.2} />
				</LogoWrapper>
				<ScreenWrapper>
					<DesktopScreen id="screen-container">{children}</DesktopScreen>
				</ScreenWrapper>
			</Container>
		</Background>
	);
}

export default ScreenContainer;
