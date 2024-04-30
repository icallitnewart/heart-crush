import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';

import { CellInfoType } from '../types/board.type';
import { HeartCoordsType, MovingHeartsType } from '../types/heart.type';

import { disableSwipe, moveHearts } from '../redux/slices/gameSlice';
import {
	getCoords,
	getMovingDirection,
	getNearHeart,
	getNearHeartPosition,
	getOppositeMovingDirection,
} from '../utils/heartSwipe';
import { getBoardSize } from '../utils/boardSize';

function useSwipeHearts(cellInfo: CellInfoType) {
	const { id, position, heart } = cellInfo;
	const initialCoords: HeartCoordsType = { x: 0, y: 0 };

	const swipeStartRef = useRef<HeartCoordsType>(initialCoords);
	const swipeEndRef = useRef<HeartCoordsType>(initialCoords);
	const dispatch = useAppDispatch();
	const board = useAppSelector(state => state.game.board);
	const isSwipeEnabled = useAppSelector(state => state.game.isSwipeEnabled);

	const handleSwipeStart = (
		e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
	): void => {
		if (!isSwipeEnabled) return;

		const { x, y } = getCoords(e);
		swipeStartRef.current = { x, y };
		// console.log('Start', swipeStartRef.current, swipeEndRef.current);
	};

	const handleSwipeMove = (
		e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
	): void => {
		if (e.nativeEvent instanceof MouseEvent) {
			const isMouseClicked = e.nativeEvent.buttons === 1;
			if (!isMouseClicked) return;
		}

		const { x, y } = getCoords(e);
		swipeEndRef.current = { x, y };

		// console.log('Move', swipeStartRef.current, swipeEndRef.current);
	};

	const handleSwipeEnd = (): void => {
		const { x: x1, y: y1 } = swipeStartRef.current;
		const { x: x2, y: y2 } = swipeEndRef.current;

		const isSwipeValid = !((!x1 && !y1) || (!x2 && !y2));
		if (!isSwipeValid) return;

		dispatch(disableSwipe());

		const direction = getMovingDirection(x1, x2, y1, y2);
		if (direction) {
			const { rows } = getBoardSize(board);
			const nearHeart = getNearHeart(board, position, rows, direction);
			if (!nearHeart) return;

			const oppositeDirection = getOppositeMovingDirection(direction);
			const nearHeartPosition = getNearHeartPosition(position, direction);
			const movingHearts: MovingHeartsType = {
				[id]: {
					heart,
					direction,
					position,
					isReturning: false,
				},
				[nearHeart.id]: {
					heart: nearHeart.heart,
					direction: oppositeDirection,
					position: nearHeartPosition,
					isReturning: false,
				},
			};

			dispatch(moveHearts(movingHearts));
			swipeStartRef.current = initialCoords;
			swipeEndRef.current = initialCoords;
		}
	};

	return {
		handleSwipeStart,
		handleSwipeMove,
		handleSwipeEnd,
	};
}

export default useSwipeHearts;
