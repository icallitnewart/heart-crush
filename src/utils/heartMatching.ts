import { BoardType, CellPositionType } from '../types/board.type';
import { HeartType } from '../types/common.type';

import { getBoardSize } from './boardSize';

export function isHeartsMatchUpward(
	board: BoardType,
	position: CellPositionType,
	currentHeart: HeartType,
) {
	const { columnIndex, rowIndex } = position;
	const isRowIndexValid = rowIndex > 1;

	return (
		isRowIndexValid &&
		currentHeart === board[columnIndex].cells[rowIndex - 1].heart &&
		currentHeart === board[columnIndex].cells[rowIndex - 2].heart
	);
}

export function isHeartsMatchDownward(
	board: BoardType,
	position: CellPositionType,
	currentHeart: HeartType,
) {
	const { columnIndex, rowIndex } = position;
	const { rows } = getBoardSize(board);
	const isRowIndexValid = rowIndex < rows - 2;

	return (
		isRowIndexValid &&
		currentHeart === board[columnIndex].cells[rowIndex + 1].heart &&
		currentHeart === board[columnIndex].cells[rowIndex + 2].heart
	);
}

export function isHeartsMatchLeftward(
	board: BoardType,
	position: CellPositionType,
	currentHeart: HeartType,
) {
	const { columnIndex, rowIndex } = position;
	const isColumnIndexValid = columnIndex > 1;

	return (
		isColumnIndexValid &&
		currentHeart === board[columnIndex - 1].cells[rowIndex].heart &&
		currentHeart === board[columnIndex - 2].cells[rowIndex].heart
	);
}

export function isHeartsMatchRightward(
	board: BoardType,
	position: CellPositionType,
	currentHeart: HeartType,
) {
	const { columnIndex, rowIndex } = position;
	const { columns } = getBoardSize(board);
	const isColumnIndexValid = columnIndex < columns - 2;

	return (
		isColumnIndexValid &&
		currentHeart === board[columnIndex + 1].cells[rowIndex].heart &&
		currentHeart === board[columnIndex + 2].cells[rowIndex].heart
	);
}
