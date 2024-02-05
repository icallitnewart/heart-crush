import { MOVE_HEART } from '../constants/heart.constant';
import { BoardType, CellPositionType } from '../types/board.type';
import { HeartCoordsType, HeartMovingDirectionType } from '../types/heart.type';

export function getMovingDirection(
	x1: number,
	x2: number,
	y1: number,
	y2: number,
) {
	let direction;
	const sensitivity = 0;
	const dx = x1 - x2;
	const dy = y1 - y2;

	if (Math.abs(dx) > Math.abs(dy)) {
		direction = dx > sensitivity ? MOVE_HEART.LEFT : MOVE_HEART.RIGHT;
	} else {
		direction = dy > sensitivity ? MOVE_HEART.UP : MOVE_HEART.DOWN;
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
	position: CellPositionType,
	rows: number,
	direction: HeartMovingDirectionType,
) {
	const { columnIndex, rowIndex } = position;
	let nearHeart;

	// TODO: checkIsInVisibleArea 함수 만들기
	const isNearHeartInVisibleArea = !(
		direction === MOVE_HEART.UP && rowIndex - 1 <= rows / 2 - 1
	);

	if (isNearHeartInVisibleArea) {
		const targetHeart = {
			up: board[columnIndex]?.cells[rowIndex - 1],
			down: board[columnIndex]?.cells[rowIndex + 1],
			right: board[columnIndex + 1]?.cells[rowIndex],
			left: board[columnIndex - 1]?.cells[rowIndex],
		};

		nearHeart = targetHeart[direction];
	}

	return nearHeart;
}

export function getNearHeartPosition(
	position: CellPositionType,
	direction: HeartMovingDirectionType,
) {
	const { columnIndex, rowIndex } = position;
	const newPosition: CellPositionType = {
		columnIndex,
		rowIndex,
	};

	switch (direction) {
		case MOVE_HEART.UP: {
			newPosition.rowIndex -= 1;
			break;
		}
		case MOVE_HEART.DOWN: {
			newPosition.rowIndex += 1;
			break;
		}
		case MOVE_HEART.RIGHT: {
			newPosition.columnIndex += 1;
			break;
		}
		case MOVE_HEART.LEFT: {
			newPosition.columnIndex -= 1;
			break;
		}
		default: {
			break;
		}
	}

	return newPosition;
}
