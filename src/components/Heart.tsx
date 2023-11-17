import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

import { HeartIconsTypes } from '../types/heart';

interface HeartIconStyleProps {
	$heartColor: HeartIconsTypes;
}

const HeartIcon = styled(FaHeart)<HeartIconStyleProps>`
	width: 100%;
	height: 100%;

	color: var(--heart-color-${props => props.$heartColor});
	stroke: #555;
	stroke-width: 20;
	filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
	cursor: pointer;

	&:hover {
		transform: scale(1.15);
	}
`;

interface HeartProps {
	heartColor: HeartIconsTypes;
}

function Heart({ heartColor }: HeartProps): React.ReactElement {
	return <HeartIcon $heartColor={heartColor} viewBox="-20 10 550 550" />;
}

export default Heart;
