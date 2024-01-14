import { nanoid } from 'nanoid';

import { BoardType } from '../types/board.type';
import { getRandomHeart, isHeartsMatch } from './heart.feature';

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
