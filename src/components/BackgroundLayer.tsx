import React from 'react';
import { styled } from 'styled-components';

interface BackgroundStylePropsType {
	$opacity: number | undefined;
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
	background-color: rgba(0, 0, 0, ${({ $opacity }) => $opacity});
`;

interface BackgroundLayerPropsType {
	children: React.ReactElement | string;
	opacity?: number;
}

function BackgroundLayer({
	children,
	opacity,
}: BackgroundLayerPropsType): React.ReactElement {
	return <Background $opacity={opacity}>{children}</Background>;
}

BackgroundLayer.defaultProps = {
	opacity: 0.4,
};

export default BackgroundLayer;
