import React, { useEffect, useRef } from 'react';
import styled, { RuleSet, css, keyframes } from 'styled-components';
import { isMobileOnly } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { CellInfoType, CellType } from '../../types/board.type';
import { HeartMovingDirectionType } from '../../types/heart.type';
import HEART_ICONS from '../../constants/heart.constant';
import {
	ANIMATION_DELAY,
	ANIMATION_DURATION,
} from '../../constants/ui.constant';

import useSwipeHearts from '../../hooks/useSwipeHearts';
import { setIsSwapHint } from '../../redux/slices/gameSlice';
import { calculateFallingSpeed } from '../../utils/heartFallingSpeed';

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

const highlightAnimation = keyframes`
	0% { transform: scale(1); }
	50% { transform: scale(1.1); }
	100% { transform: scale(1); }
`;

const fallAnimation = (distance: number) => keyframes`
	0% { transform: translateY(0); }
	100% { transform: translateY(${distance * 100}%); }
`;

interface ContainerStylePropsType {
	$isMoving: boolean;
	$isFalling: boolean;
	$fallingDistance: number;
	$isReturning: boolean;
	$isSwapHint: boolean;
	$direction: HeartMovingDirectionType | undefined;
}

const Container = styled.div<ContainerStylePropsType>`
	width: 100%;
	aspect-ratio: 1 / 1;
	padding: 5px;
	cursor: pointer;

	@media ${({ theme }) => theme.mobile} {
		${isMobileOnly && `padding: 3px`}
	}

	${({
		$isMoving,
		$isReturning,
		$isSwapHint,
		$direction,
		$isFalling,
		$fallingDistance,
	}) => {
		let animationStyle: string | RuleSet<object> = 'none';

		if ($isMoving && $direction) {
			animationStyle = css`
				${$isReturning
					? reverseMoveAnimation[$direction]
					: moveAnimation[$direction]} ${ANIMATION_DURATION.MOVING_HEART}ms
			`;
		} else if ($isFalling) {
			animationStyle = css`
				${fallAnimation($fallingDistance)} ${calculateFallingSpeed(
					$fallingDistance,
				)}ms cubic-bezier(0.4, 0, 0.2, 1)
			`;
		} else if ($isSwapHint) {
			animationStyle = css`
				${highlightAnimation} ${ANIMATION_DURATION.SWAP_HINT}ms infinite
			`;
		}

		return css`
			animation: ${animationStyle} forwards;
		`;
	}}

	&:hover svg {
		transform: scale(1.15);
	}
`;

interface CellPropsType {
	cellData: CellType;
	columnIndex: number;
	rowIndex: number;
}

function Cell({
	cellData,
	columnIndex,
	rowIndex,
}: CellPropsType): React.ReactElement {
	const heartColor = HEART_ICONS[cellData.heart];
	const { id, heart } = cellData;
	const cellInfo: CellInfoType = {
		id,
		heart,
		position: {
			columnIndex,
			rowIndex,
		},
	};

	const dispatch = useAppDispatch();
	const isSwapHint = useAppSelector(state => state.game.boardStatus.isSwapHint);
	const movingStatus = useAppSelector(state => state.game.movingHearts?.[id]);
	const crushedHearts = useAppSelector(state => state.game.crushedHearts);
	const fallingHearts = useAppSelector(state => state.game.fallingHearts);
	const swappableCells = useAppSelector(
		state => state.game.boardStatus.swappableCells,
	);
	const isSwappable = !!swappableCells?.[id];
	const prevSwappableCellsRef = useRef(swappableCells);
	const isCrushed = crushedHearts.find(cell => cell.id === id);
	const isFalling = fallingHearts.find(cell => cell.id === id);
	const fallingDistance = isFalling ? isFalling.distance : 1;
	const { handleSwipeStart, handleSwipeMove, handleSwipeEnd } =
		useSwipeHearts(cellInfo);

	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;

		if (isSwappable) {
			animationTimer = setTimeout(() => {
				prevSwappableCellsRef.current = swappableCells;
				dispatch(setIsSwapHint(true));
			}, ANIMATION_DELAY.SWAP_HINT);
		} else if (prevSwappableCellsRef.current?.[id]) {
			// 이전의 하트 스왑 힌트에 해당하는 셀이었다면 스왑 힌트 해제
			prevSwappableCellsRef.current = swappableCells;
			dispatch(setIsSwapHint(false));
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
	}, [isSwappable, id, swappableCells, dispatch]);

	return (
		<Container
			$isMoving={!!movingStatus}
			$direction={movingStatus?.direction}
			$isReturning={!!movingStatus?.isReturning}
			$isFalling={!!isFalling}
			$isSwapHint={!!isSwapHint && isSwappable}
			$fallingDistance={fallingDistance}
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
