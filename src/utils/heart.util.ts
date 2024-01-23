import { MOVE_HEART } from '../constants/heart.contsant';
import { BoardType, CellType } from '../types/board.type';
import {
	HeartCoordsType,
	HeartDistanceType,
	HeartMovingDirectionType,
	HeartPositionType,
	MovingHeartInfoType,
} from '../types/heart.type';

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
	position: HeartPositionType,
	rows: number,
	direction: HeartMovingDirectionType,
) {
	const { columnIndex, cellIndex } = position;
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

export function getNearHeartPosition(
	position: HeartPositionType,
	direction: HeartMovingDirectionType,
) {
	const { columnIndex, cellIndex } = position;
	const newPosition: HeartPositionType = {
		columnIndex,
		cellIndex,
	};

	switch (direction) {
		case MOVE_HEART.UP: {
			newPosition.cellIndex -= 1;
			break;
		}
		case MOVE_HEART.DOWN: {
			newPosition.cellIndex += 1;
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

function findSameHearts(
	currentHeartInfo: MovingHeartInfoType,
	direction: HeartDistanceType,
	board: BoardType,
) {
	const { dx, dy } = direction;
	const { heart: currentHeart, position } = currentHeartInfo;
	let { columnIndex, cellIndex } = position;
	const sameHearts: CellType[] = [];

	while (true) {
		columnIndex += dx;
		cellIndex += dy;

		const isPositionValid =
			columnIndex >= 0 &&
			columnIndex < board.length &&
			cellIndex >= board[columnIndex].cells.length / 2 &&
			cellIndex < board[columnIndex].cells.length;
		if (!isPositionValid) break;

		const cell = board[columnIndex].cells[cellIndex];
		if (cell.heart !== currentHeart) break;
		sameHearts.push(cell);
	}

	return sameHearts;
}

export function checkMatching(
	currentHeartInfo: MovingHeartInfoType,
	board: BoardType,
) {
	const matchedHearts = [];
	const verticalDirections: HeartDistanceType[] = [
		{ dx: 0, dy: -1 },
		{ dx: 0, dy: 1 },
	];
	const horizontalDirections: HeartDistanceType[] = [
		{ dx: -1, dy: 0 },
		{ dx: 1, dy: 0 },
	];

	const checkDirections = (directions: HeartDistanceType[]) =>
		directions.reduce(
			(sameHearts: CellType[], direction: HeartDistanceType) =>
				sameHearts.concat(findSameHearts(currentHeartInfo, direction, board)),
			[],
		);

	const sameHeartsInColumn: CellType[] = checkDirections(verticalDirections);
	const sameHeartsInRow: CellType[] = checkDirections(horizontalDirections);
	const isMatched = (sameHearts: CellType[]) => sameHearts.length > 1;

	if (isMatched(sameHeartsInColumn)) matchedHearts.push(...sameHeartsInColumn);
	if (isMatched(sameHeartsInRow)) matchedHearts.push(...sameHeartsInRow);

	if (matchedHearts.length > 0) {
		const { columnIndex, cellIndex } = currentHeartInfo.position;
		const currentHeart: CellType = board[columnIndex].cells[cellIndex];
		matchedHearts.push(currentHeart);
	}

	return matchedHearts;
}
