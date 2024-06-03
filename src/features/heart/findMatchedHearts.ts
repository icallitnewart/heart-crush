import { BOARD_HIDDEN_ROWS_MULTIPLIER } from '../../constants/board.constant';
import { BoardType, CellInfoType } from '../../types/board.type';
import {
	HeartDistanceType,
	MatchingCandidatesType,
	MovingHeartInfoType,
} from '../../types/heart.type';

import { getBoardSize } from '../../utils/boardSize';

function isPositionValid(
	board: BoardType,
	columnIndex: number,
	rowIndex: number,
): boolean {
	const { columns, rows } = getBoardSize(board);

	return (
		columnIndex >= 0 &&
		columnIndex < columns &&
		rowIndex >= rows - rows / BOARD_HIDDEN_ROWS_MULTIPLIER &&
		rowIndex < rows
	);
}

function findSameHearts(
	currentHeartInfo: MovingHeartInfoType | CellInfoType,
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

		if (!isPositionValid(board, columnIndex, rowIndex)) break;

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

function exploreDirections(
	currentHeartInfo: MovingHeartInfoType | CellInfoType,
	board: BoardType,
) {
	const verticalDirections: HeartDistanceType[] = [
		{ dx: 0, dy: -1 },
		{ dx: 0, dy: 1 },
	];
	const horizontalDirections: HeartDistanceType[] = [
		{ dx: -1, dy: 0 },
		{ dx: 1, dy: 0 },
	];
	const sameHeartsInColumn: CellInfoType[] = verticalDirections.flatMap(
		direction => findSameHearts(currentHeartInfo, direction, board),
	);
	const sameHeartsInRow: CellInfoType[] = horizontalDirections.flatMap(
		direction => findSameHearts(currentHeartInfo, direction, board),
	);

	return { sameHeartsInColumn, sameHeartsInRow };
}

function checkMatching(
	currentHeartInfo: MovingHeartInfoType | CellInfoType,
	board: BoardType,
) {
	const matchedHearts: CellInfoType[] = [];
	const { sameHeartsInColumn, sameHeartsInRow } = exploreDirections(
		currentHeartInfo,
		board,
	);
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

function findMatchedHearts(
	board: BoardType,
	targetHearts: MatchingCandidatesType,
) {
	const matchedHeartsMap = new Map();

	targetHearts.forEach(heart => {
		const foundMatchedHearts = checkMatching(heart, board);

		foundMatchedHearts.forEach(foundMatchedHeart => {
			matchedHeartsMap.set(foundMatchedHeart.id, foundMatchedHeart);
		});
	});

	const matchedHearts = Array.from(matchedHeartsMap.values());
	return matchedHearts;
}

export default findMatchedHearts;
