import { nanoid } from 'nanoid';

import { BoardType, CellInfoType, ColumnType } from '../../types/board.type';
import { FallingHeartsType } from '../../types/heart.type';
import { categoriseHeartsByColumn } from '../../utils/heartSorting';
import { getRandomHeart } from '../../utils/heartCreation';
import { isHeartsMatchDownward } from '../../utils/heartMatching';

function updateColumnWithFallingHearts(
	column: ColumnType,
	hearts: CellInfoType[],
): ColumnType {
	const newColumn = column;

	hearts.forEach(heart => {
		const { rowIndex } = heart.position;
		newColumn.cells[rowIndex] = {
			id: heart.id,
			heart: heart.heart,
		};
	});

	return newColumn;
}

function fillEmptyCellsWithNewHearts(
	board: BoardType,
	column: ColumnType,
	columnIndex: number,
	hearts: CellInfoType[],
): ColumnType {
	const newColumn = column;
	const rowIndexes = hearts.map(heart => heart.position.rowIndex);
	const minRowIndex = Math.min(...rowIndexes);

	for (let rowIndex = minRowIndex - 1; rowIndex >= 0; rowIndex -= 1) {
		let randomHeart;
		const position = {
			columnIndex,
			rowIndex,
		};

		do {
			randomHeart = getRandomHeart();
		} while (isHeartsMatchDownward(board, position, randomHeart));

		newColumn.cells[rowIndex] = {
			id: nanoid(),
			heart: randomHeart,
		};
	}

	return newColumn;
}

function rearrangeBoard(
	board: BoardType,
	fallingHearts: FallingHeartsType,
): BoardType {
	const heartsByColumn = categoriseHeartsByColumn(fallingHearts);

	const updatedBoard = board.map((column, columnIndex) => {
		let updatedColumn = {
			...column,
			cells: column.cells.map(cell => ({ ...cell })),
		};
		const hearts = heartsByColumn[columnIndex];
		if (!hearts) return updatedColumn;

		updatedColumn = updateColumnWithFallingHearts(updatedColumn, hearts);
		updatedColumn = fillEmptyCellsWithNewHearts(
			board,
			updatedColumn,
			columnIndex,
			hearts,
		);

		return updatedColumn;
	});

	return updatedBoard;
}

export default rearrangeBoard;
