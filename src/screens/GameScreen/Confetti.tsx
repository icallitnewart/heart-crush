// Confetti.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { nanoid } from 'nanoid';
import { FaHeart } from 'react-icons/fa';

import HEART_ICONS from '../../constants/heart.constant';
import { ANIMATION_DURATION } from '../../constants/ui.constant';

const fallAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(3000%) rotate(360deg);
    opacity: 0;
  }
`;

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const ConfettiPiece = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	opacity: 0;
	animation: ${fallAnimation} ${ANIMATION_DURATION.CONFETTI}ms linear;
`;

interface HeartIconPropsType {
	$color: string;
}

const HeartIcon = styled(FaHeart)<HeartIconPropsType>`
	width: 100%;
	height: 100%;
	color: var(--heart-color-${props => props.$color});
	stroke: #555;
	stroke-width: 30;
`;

const generateConfettiPieces = (numberOfPieces: number) => {
	const colors = Object.values(HEART_ICONS);

	return Array.from({ length: numberOfPieces }).map(_ => {
		const id = nanoid();
		const color = colors[Math.floor(Math.random() * colors.length)];

		return (
			<ConfettiPiece
				key={id}
				style={{
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
				}}
			>
				<HeartIcon
					$color={color}
					style={{ transform: `rotate(${Math.random() * 360}deg)` }}
				/>
			</ConfettiPiece>
		);
	});
};

function Confetti() {
	return <Container>{generateConfettiPieces(200)}</Container>;
}

export default Confetti;
