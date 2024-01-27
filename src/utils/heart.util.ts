import { MOVE_HEART } from '../constants/heart.constant';
import { BoardType, CellInfoType, CellPositionType } from '../types/board.type';
import {
	FallingHeartsType,
	HeartCoordsType,
	HeartDistanceType,
	HeartMovingDirectionType,
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

function findSameHearts(
	currentHeartInfo: MovingHeartInfoType,
	direction: HeartDistanceType,
	board: BoardType,
) {
	const { dx, dy } = direction;
	const { heart: currentHeart, position } = currentHeartInfo;
	let { columnIndex, rowIndex } = position;
	const sameHearts: CellInfoType[] = [];

	while (true) {
		columnIndex += dx;
		rowIndex += dy;

		const isPositionValid =
			columnIndex >= 0 &&
			columnIndex < board.length &&
			rowIndex >= board[columnIndex].cells.length / 2 &&
			rowIndex < board[columnIndex].cells.length;
		if (!isPositionValid) break;

		const cell = board[columnIndex].cells[rowIndex];
		if (cell.heart !== currentHeart) break;

		const foundHeart = {
			...cell,
			position: {
				columnIndex,
				rowIndex,
			},
		};
		sameHearts.push(foundHeart);
	}

	return sameHearts;
}

export function checkMatching(
	currentHeartInfo: MovingHeartInfoType,
	board: BoardType,
) {
	const matchedHearts: CellInfoType[] = [];
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
			(sameHearts: CellInfoType[], direction: HeartDistanceType) =>
				sameHearts.concat(findSameHearts(currentHeartInfo, direction, board)),
			[],
		);

	const sameHeartsInColumn: CellInfoType[] =
		checkDirections(verticalDirections);
	const sameHeartsInRow: CellInfoType[] = checkDirections(horizontalDirections);
	const isMatched = (sameHearts: CellInfoType[]) => sameHearts.length > 1;

	if (isMatched(sameHeartsInColumn)) matchedHearts.push(...sameHeartsInColumn);
	if (isMatched(sameHeartsInRow)) matchedHearts.push(...sameHeartsInRow);

	if (matchedHearts.length > 0) {
		const { columnIndex, rowIndex } = currentHeartInfo.position;
		const currentCell = board[columnIndex].cells[rowIndex];
		const currentHeart = {
			...currentCell,
			position: {
				columnIndex,
				rowIndex,
			},
		};
		matchedHearts.push(currentHeart);
	}

	return matchedHearts;
}

export function categoriseHeartsByColumn(
	hearts: CellInfoType[],
): Record<number, CellInfoType[]> {
	return hearts.reduce(
		(acc, heart) => {
			const { columnIndex } = heart.position;

			if (!acc[columnIndex]) acc[columnIndex] = [];
			acc[columnIndex].push(heart);

			return acc;
		},
		{} as Record<number, CellInfoType[]>,
	);
}

export function findFallingHearts(
	board: BoardType,
	heartsByColumn: Record<number, CellInfoType[]>,
) {
	const fallingHearts: FallingHeartsType = [];

	Object.entries(heartsByColumn).forEach(
		([columnIdx, crushedHearts]: [string, CellInfoType[]]) => {
			const columnIndex = Number(columnIdx);
			const distance = crushedHearts.length;
			const rowIndexes = crushedHearts.map(heart => heart.position.rowIndex);
			const minRowIndex = Math.min(...rowIndexes);

			const targetColumn = board[columnIndex].cells;
			const targetHearts: FallingHeartsType = targetColumn
				.slice(0, minRowIndex)
				.map((heart, rowIndex) => ({
					...heart,
					position: {
						columnIndex,
						rowIndex: rowIndex + distance,
					},
					distance,
				}));

			fallingHearts.push(...targetHearts);
		},
	);
	return fallingHearts;
}
