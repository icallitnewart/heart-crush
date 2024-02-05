import { nanoid } from 'nanoid';

import { BoardType } from '../../types/board.type';
import { HeartType } from '../../types/common.type';
import { getRandomHeart } from '../../utils/heartCreation';

function isHeartsMatch(
	board: BoardType,
	column: number,
	row: number,
	heart: HeartType,
) {
	const currentHeart = heart;

	const isMatchInColumn =
		column > 1 &&
		currentHeart === board[column - 1].cells[row].heart &&
		currentHeart === board[column - 2].cells[row].heart;

	const isMatchInRow =
		row > 1 &&
		currentHeart === board[column].cells[row - 1].heart &&
		currentHeart === board[column].cells[row - 2].heart;

	return isMatchInColumn || isMatchInRow;
}

function initialiseBoard(columns: number, rows: number): BoardType {
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

export default initialiseBoard;
