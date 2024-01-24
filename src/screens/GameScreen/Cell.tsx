import React, { useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';
import HEART_ICONS from '../../constants/heart.constant';
import { ANIMATION_DURATION } from '../../constants/settings.constant';
import { CellInfoType, CellType } from '../../types/board.type';
import { HeartMovingDirectionType } from '../../types/heart.type';
import useSwipeHearts from '../../hooks/useSwipeHearts';

import Heart from '../../components/Heart';

type MoveAnimationType = {
	[key in HeartMovingDirectionType]: ReturnType<typeof keyframes>;
};

const moveAnimation: MoveAnimationType = {
	right: keyframes`
				0% { transform: translateX(0); }
				50% { transform: translateX(50%); }
				100% { transform: translateX(100%); }`,
	left: keyframes`
				0% { transform: translateX(0); }
				50% { transform: translateX(-50%); }
				100% { transform: translateX(-100%); }`,
	up: keyframes`
				0% { transform: translateY(0); }
				50% { transform: translateY(-50%); }
				100% { transform: translateY(-100%); }`,
	down: keyframes`
				0% { transform: translateY(0); }
				50% { transform: translateY(50%); }
				100% { transform: translateY(100%); }`,
};

const reverseMoveAnimation: MoveAnimationType = {
	right: keyframes`
				0% { transform: translateX(100%); }
				50% { transform: translateX(50%); }
				100% { transform: translateX(0); }`,
	left: keyframes`
				0% { transform: translateX(-100%); }
				50% { transform: translateX(-50%); }
				100% { transform: translateX(0); }`,
	up: keyframes`
				0% { transform: translateY(-100%); }
				50% { transform: translateY(-50%); }
				100% { transform: translateY(0); }`,
	down: keyframes`
				0% { transform: translateY(100%); }
				50% { transform: translateY(50%); }
				100% { transform: translateY(0); }`,
};

interface ContainerStylePropsType {
	$isMoving: boolean;
	$isReturning: boolean;
	$direction: HeartMovingDirectionType | undefined;
	$animationDuration: number;
}

const Container = styled.div<ContainerStylePropsType>`
	width: 100%;
	aspect-ratio: 1 / 1;
	padding: 5px;
	cursor: pointer;
	animation: ${({ $isMoving, $isReturning, $direction, $animationDuration }) =>
		$isMoving && $direction
			? css`
					${$isReturning
						? reverseMoveAnimation[$direction]
						: moveAnimation[$direction]} ${$animationDuration}ms forwards
			  `
			: 'none'};

	&:hover svg {
		transform: scale(1.15);
	}
`;

interface CellPropsType {
	cellData: CellType;
	columnIndex: number;
	rowIndex: number;
	rows: number;
}

function Cell({
	cellData,
	columnIndex,
	rowIndex,
	rows,
}: CellPropsType): React.ReactElement {
	const heartColor = HEART_ICONS[cellData.heart];
	const cellInfo: CellInfoType = {
		id: cellData.id,
		heart: cellData.heart,
		position: {
			columnIndex,
			rowIndex,
		},
	};

	const { movingHearts, crushedHearts } = useContext(GamePlayContext);
	const movingStatus = movingHearts?.[cellInfo.id];
	const animationDuration = ANIMATION_DURATION.MOVING_HEART;
	const isCrushed = crushedHearts.find(heart => heart.id === cellInfo.id);
	const { handleSwipeStart, handleSwipeMove, handleSwipeEnd } = useSwipeHearts(
		cellInfo,
		rows,
	);

	return (
		<Container
			$isMoving={!!movingStatus}
			$isReturning={!!movingStatus?.isReturning}
			$direction={movingStatus?.direction}
			$animationDuration={animationDuration}
			onTouchStart={handleSwipeStart}
			onTouchMove={handleSwipeMove}
			onTouchEnd={handleSwipeEnd}
			onMouseDown={handleSwipeStart}
			onMouseMove={handleSwipeMove}
			onMouseLeave={handleSwipeEnd}
		>
			<Heart heartColor={heartColor} isCrushed={!!isCrushed} />
		</Container>
	);
}

export default React.memo(Cell);
