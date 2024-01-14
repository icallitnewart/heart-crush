import React, { useContext, useEffect, useRef } from 'react';

import { SWAP_HEARTS } from '../constants/gamePlay.constant';
import {
	getCoords,
	getMovingDirection,
	getNearHeart,
	getOppositeMovingDirection,
} from '../utils/heart.util';
import {
	HeartCoordsType,
	HeartInfoType,
	MovingHeartsType,
} from '../types/heart.type';
import { GamePlayContext } from '../states/GamePlayContext';

function useSwapHearts(
	heartInfo: HeartInfoType,
	rows: number,
	animationDuration: number,
) {
	const { id, location } = heartInfo;
	const initialCoords: HeartCoordsType = { x: 0, y: 0 };

	const swipeStartRef = useRef<HeartCoordsType>(initialCoords);
	const swipeEndRef = useRef<HeartCoordsType>(initialCoords);
	const { board, dispatch, isSwiping, movingHearts } =
		useContext(GamePlayContext);

	const swapHearts = (movingHeartsInfo: MovingHeartsType) => {
		dispatch({
			type: SWAP_HEARTS,
			movingHearts: movingHeartsInfo,
		});
	};

	const handleSwipeStart = (
		e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
	): void => {
		// if (isSwiping) return;

		const { x, y } = getCoords(e);
		swipeStartRef.current = { x, y };
		// isSwiping true
		// console.log('Start', swipeStartRef.current, swipeEndRef.current);
	};

	const handleSwipeMove = (
		e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
	): void => {
		if (e.nativeEvent instanceof MouseEvent) {
			const isMouseMoveValid = e.nativeEvent.buttons === 1;
			if (!isMouseMoveValid) return;
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

		const direction = getMovingDirection(x1, x2, y1, y2);
		if (direction) {
			const nearHeart = getNearHeart(board, location, rows, direction);
			if (!nearHeart) return;

			const movingHeartsInfo: MovingHeartsType = {
				[id]: direction,
				[nearHeart.id]: getOppositeMovingDirection(direction),
			};
			swapHearts(movingHeartsInfo);

			swipeStartRef.current = initialCoords;
			swipeEndRef.current = initialCoords;
		}
	};

	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;

		if (movingHearts && Object.keys(movingHearts).length === 2) {
			animationTimer = setTimeout(() => {
				dispatch({
					type: SWAP_HEARTS,
					movingHearts: null,
				});
			}, animationDuration);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movingHearts]);

	return {
		handleSwipeStart,
		handleSwipeMove,
		handleSwipeEnd,
	};
}

export default useSwapHearts;
