import { nanoid } from 'nanoid';

import { BoardType } from '../../types/board.type';
import { HeartType } from '../../types/common.type';
import { getRandomHeart } from '../../utils/heartCreation';
import {
	isHeartsMatchLeftward,
	isHeartsMatchUpward,
} from '../../utils/heartMatching';

function checkHeartMatch(
	board: BoardType,
	columnIndex: number,
	rowIndex: number,
	heart: HeartType,
) {
	const position = {
		columnIndex,
		rowIndex,
	};

	return (
		isHeartsMatchUpward(board, position, heart) ||
		isHeartsMatchLeftward(board, position, heart)
	);
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
			} while (checkHeartMatch(board, c, r, randomHeart));

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
