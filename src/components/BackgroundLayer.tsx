import React from 'react';
import { styled } from 'styled-components';

interface BackgroundStylePropsType {
	$opacity?: number;
	$bgColor?: string;
}

const Background = styled.div<BackgroundStylePropsType>`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(
		${({ $bgColor }) => $bgColor},
		${({ $opacity }) => $opacity}
	);
`;

interface BackgroundLayerPropsType {
	children: React.ReactElement | string;
	opacity?: number;
	bgColor?: string;
}

function BackgroundLayer({
	children,
	opacity,
	bgColor,
}: BackgroundLayerPropsType): React.ReactElement {
	return (
		<Background $opacity={opacity} $bgColor={bgColor}>
			{children}
		</Background>
	);
}

BackgroundLayer.defaultProps = {
	opacity: 0.4,
	bgColor: '0, 0, 0',
};

export default BackgroundLayer;
