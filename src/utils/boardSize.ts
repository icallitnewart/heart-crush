import { BoardType } from '../types/board.type';

export function getBoardSize(board: BoardType): {
	columns: number;
	rows: number;
} {
	return {
		columns: board.length,
		rows: board[0].cells.length,
	};
}
