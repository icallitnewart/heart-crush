import { nanoid } from 'nanoid';

import { BoardType } from '../types/board.type';
import { FallingHeartsType, MovingHeartsType } from '../types/heart.type';
import { getRandomHeart, isHeartsMatch } from './heart.feature';
import { categoriseHeartsByColumn } from '../utils/heart.util';
import { updateBoardAfterCrush } from '../utils/board.util';

export function initialiseBoard(columns: number, rows: number): BoardType {
	const board = new Array(columns);

	for (let c = 0; c < columns; c += 1) {
		// Column 데이터
		board[c] = {
			id: nanoid(),
			cells: new Array(rows),
		};

		for (let r = 0; r < rows; r += 1) {
			// 하트 매칭 방지
			let randomHeart;
			do {
				randomHeart = getRandomHeart();
			} while (isHeartsMatch(board, c, r, randomHeart));

			// Cell 데이터
			board[c].cells[r] = {
				id: nanoid(),
				heart: randomHeart,
			};
		}
	}

	return board;
}

export function updateBoardWithSwappedHearts(
	targetHearts: MovingHeartsType,
	board: BoardType,
) {
	const newBoard = board.map(column => ({
		...column,
		cells: [...column.cells],
	}));
	const [first, second] = Object.keys(targetHearts);
	const { columnIndex: columnIndex1, rowIndex: rowIndex1 } =
		targetHearts[first].position;
	const { columnIndex: columnIndex2, rowIndex: rowIndex2 } =
		targetHearts[second].position;

	[
		newBoard[columnIndex1].cells[rowIndex1],
		newBoard[columnIndex2].cells[rowIndex2],
	] = [
		newBoard[columnIndex2].cells[rowIndex2],
		newBoard[columnIndex1].cells[rowIndex1],
	];

	return newBoard;
}

export function rearrangeBoard(
	board: BoardType,
	fallingHearts: FallingHeartsType,
) {
	const heartsByColumn = categoriseHeartsByColumn(fallingHearts);
	const updatedBoard = updateBoardAfterCrush(board, heartsByColumn);

	return updatedBoard;
}
