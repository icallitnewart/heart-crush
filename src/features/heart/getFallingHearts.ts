import { BoardType, CellInfoType } from '../../types/board.type';
import { FallingHeartsType } from '../../types/heart.type';
import { categoriseHeartsByColumn } from '../../utils/heartSorting';

function findFallingHearts(
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

function getFallingHearts(board: BoardType, crushedHearts: CellInfoType[]) {
	const heartsByColumn = categoriseHeartsByColumn(crushedHearts);
	const fallingHearts = findFallingHearts(board, heartsByColumn);
	return fallingHearts;
}

export default getFallingHearts;
