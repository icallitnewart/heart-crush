import React, { useContext, useRef } from 'react';

import { MOVE_HEARTS } from '../constants/gamePlay.constant';
import {
	getCoords,
	getMovingDirection,
	getNearHeart,
	getNearHeartPosition,
	getOppositeMovingDirection,
} from '../utils/heartSwipe';
import { CellInfoType } from '../types/board.type';
import { HeartCoordsType, MovingHeartsType } from '../types/heart.type';
import { GamePlayContext } from '../states/GamePlayContext';

function useSwipeHearts(cellInfo: CellInfoType, rows: number) {
	const { id, position, heart } = cellInfo;
	const initialCoords: HeartCoordsType = { x: 0, y: 0 };

	const swipeStartRef = useRef<HeartCoordsType>(initialCoords);
	const swipeEndRef = useRef<HeartCoordsType>(initialCoords);
	const { board, dispatch, isSwipeEnabled } = useContext(GamePlayContext);

	const moveHearts = (movingHeartsInfo: MovingHeartsType) => {
		dispatch({
			type: MOVE_HEARTS,
			movingHearts: movingHeartsInfo,
		});
	};

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

		// TODO: isSwipingEnabled 비활성화 작업 필요

		const direction = getMovingDirection(x1, x2, y1, y2);
		if (direction) {
			const nearHeart = getNearHeart(board, position, rows, direction);
			if (!nearHeart) return;

			const oppositeDirection = getOppositeMovingDirection(direction);
			const nearHeartPosition = getNearHeartPosition(position, direction);
			const movingHeartsInfo: MovingHeartsType = {
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

			moveHearts(movingHeartsInfo);
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
