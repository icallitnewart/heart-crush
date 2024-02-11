import { BoardType, CellInfoType } from '../../types/board.type';
import { FallingHeartsType } from '../../types/heart.type';
import { categoriseHeartsByColumn } from '../../utils/heartSorting';

function getFallingHearts(
	board: BoardType,
	crushedHearts: CellInfoType[],
): FallingHeartsType {
	const heartsByColumn = categoriseHeartsByColumn(crushedHearts);
	const fallingHearts = Object.entries(heartsByColumn).flatMap(
		([columnIdx, hearts]: [string, CellInfoType[]]) => {
			const columnIndex = Number(columnIdx);
			const distance = hearts.length;
			const rowIndexes = hearts.map(heart => heart.position.rowIndex);
			const minRowIndex = Math.min(...rowIndexes);

			return board[columnIndex].cells
				.slice(0, minRowIndex)
				.map((heart, rowIndex) => ({
					...heart,
					position: {
						columnIndex,
						rowIndex: rowIndex + distance,
					},
					distance,
				}));
		},
	);

	return fallingHearts;
}

export default getFallingHearts;
