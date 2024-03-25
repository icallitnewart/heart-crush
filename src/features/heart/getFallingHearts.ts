import { BoardType } from '../../types/board.type';
import { CrushedHeartsType, FallingHeartsType } from '../../types/heart.type';

import { categoriseHeartsByColumn } from '../../utils/heartSorting';

function getFallingHearts(
	board: BoardType,
	crushedHearts: CrushedHeartsType,
): FallingHeartsType {
	const heartsByColumn = categoriseHeartsByColumn(crushedHearts);
	return Object.entries(heartsByColumn).flatMap(
		([colIdx, hearts]: [string, CrushedHeartsType]) => {
			const columnIndex = Number(colIdx);
			const column = board[columnIndex];
			const crushedRowIndexes = hearts.map(heart => heart.position.rowIndex);

			let distance = 0;
			const fallingHearts = [] as FallingHeartsType;

			for (
				let rowIndex = column.cells.length - 1;
				rowIndex >= 0;
				rowIndex -= 1
			) {
				if (crushedRowIndexes.includes(rowIndex)) {
					distance += 1;
				} else if (distance > 0) {
					fallingHearts.push({
						...column.cells[rowIndex],
						position: {
							columnIndex,
							rowIndex: rowIndex + distance,
						},
						distance,
					});
				}
			}

			return fallingHearts;
		},
	);
}

export default getFallingHearts;
