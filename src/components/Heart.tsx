import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

import { HeartIconType } from '../types/heart';

interface HeartIconStyleProps {
	$heartColor: HeartIconType;
}

const HeartIcon = styled(FaHeart)<HeartIconStyleProps>`
	width: 100%;
	height: 100%;

	color: var(--heart-color-${props => props.$heartColor});
	stroke: #555;
	stroke-width: 15;
	filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
	transition: transform 0.3s;

	/* &:hover {
		transform: scale(1.15);
	}  */
`;

interface HeartProps {
	heartColor: HeartIconType;
}

function Heart({ heartColor }: HeartProps): React.ReactElement {
	return <HeartIcon $heartColor={heartColor} viewBox="-20 10 550 550" />;
}

export default Heart;
