import { MOVE_HEART } from '../constants/heart.contsant';
import { BoardType } from '../types/board.type';
import { HeartCoordsType, HeartMovingDirectionType } from '../types/heart.type';

export function getMovingDirection(
	x1: number,
	x2: number,
	y1: number,
	y2: number,
) {
	let direction;
	const sensitivity = 0;
	const dX = x1 - x2;
	const dY = y1 - y2;

	if (Math.abs(dX) > Math.abs(dY)) {
		direction = dX > sensitivity ? MOVE_HEART.LEFT : MOVE_HEART.RIGHT;
	} else {
		direction = dY > sensitivity ? MOVE_HEART.UP : MOVE_HEART.DOWN;
	}

	return direction;
}

export function getOppositeMovingDirection(
	direction: HeartMovingDirectionType,
) {
	switch (direction) {
		case MOVE_HEART.UP:
			return MOVE_HEART.DOWN;
		case MOVE_HEART.DOWN:
			return MOVE_HEART.UP;
		case MOVE_HEART.LEFT:
			return MOVE_HEART.RIGHT;
		case MOVE_HEART.RIGHT:
			return MOVE_HEART.LEFT;
		default:
			return MOVE_HEART.UP;
	}
}

export function getCoords(
	e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
): HeartCoordsType {
	const event = e.nativeEvent;
	const coords = { x: 0, y: 0 };

	if (event instanceof TouchEvent) {
		const { clientX, clientY } = event.targetTouches[0];
		coords.x = clientX;
		coords.y = clientY;
	} else if (event instanceof MouseEvent) {
		const { clientX, clientY } = event;
		coords.x = clientX;
		coords.y = clientY;
	}

	return coords;
}

export function getNearHeart(
	board: BoardType,
	location: {
		columnIndex: number;
		cellIndex: number;
	},
	rows: number,
	direction: HeartMovingDirectionType,
) {
	const { columnIndex, cellIndex } = location;
	let nearHeart;

	// TODO: checkIsInVisibleArea 함수 만들기
	const isNearHeartInVisibleArea = !(
		direction === MOVE_HEART.UP && cellIndex - 1 <= rows / 2 - 1
	);

	if (isNearHeartInVisibleArea) {
		const targetHeart = {
			up: board[columnIndex]?.cells[cellIndex - 1],
			down: board[columnIndex]?.cells[cellIndex + 1],
			right: board[columnIndex + 1]?.cells[cellIndex],
			left: board[columnIndex - 1]?.cells[cellIndex],
		};

		nearHeart = targetHeart[direction];
	}

	return nearHeart;
}
