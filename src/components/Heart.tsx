import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import { HeartIconType } from '../types/heart.type';
import { ANIMATION_DURATION } from '../constants/settings.constant';

const CrushedAnimation = keyframes`
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(-5px);
	}
`;

interface HeartIconStyleProps {
	$heartColor: HeartIconType;
}

const HeartIconCommonStyle = css<HeartIconStyleProps>`
	width: 100%;
	height: 100%;
	color: var(--heart-color-${props => props.$heartColor});
	stroke: #555;
	stroke-width: 15;
	filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
`;

const HeartIcon = styled(FaHeart)<HeartIconStyleProps>`
	${HeartIconCommonStyle}
	transition: transform 0.3s;
`;

const CrushedHeartIcon = styled(FaHeartBroken)<HeartIconStyleProps>`
	${HeartIconCommonStyle}
	animation: ${CrushedAnimation} ${ANIMATION_DURATION.CRUSHED_HEART}ms forwards 100ms;
`;

interface HeartProps {
	heartColor: HeartIconType;
	isCrushed: boolean;
}

function Heart({ heartColor, isCrushed }: HeartProps): React.ReactElement {
	return isCrushed ? (
		<CrushedHeartIcon $heartColor={heartColor} viewBox="-20 10 550 550" />
	) : (
		<HeartIcon $heartColor={heartColor} viewBox="-20 10 550 550" />
	);
}

export default Heart;
