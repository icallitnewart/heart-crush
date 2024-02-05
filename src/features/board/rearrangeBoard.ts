import { nanoid } from 'nanoid';

import { BoardType, CellInfoType, ColumnType } from '../../types/board.type';
import { HeartType } from '../../types/common.type';
import { FallingHeartsType } from '../../types/heart.type';
import { categoriseHeartsByColumn } from '../../utils/heartSorting';
import { getRandomHeart } from '../../utils/heartCreation';

function isHeartsMatchDownwardInColumn(
	column: ColumnType,
	currentIndex: number,
	currentHeart: HeartType,
) {
	const isMatchDownward =
		currentHeart === column.cells[currentIndex + 1].heart &&
		currentHeart === column.cells[currentIndex + 2].heart;

	return isMatchDownward;
}

function updateBoardAfterCrush(
	board: BoardType,
	heartsByColumn: Record<number, CellInfoType[]>,
) {
	const newBoard = board.map(column => ({
		...column,
		cells: [...column.cells],
	}));

	Object.entries(heartsByColumn).forEach(
		([columnIdx, fallingHearts]: [string, CellInfoType[]]) => {
			const columnIndex = Number(columnIdx);
			const targetColumn = newBoard[columnIndex];
			const rowIndexes = fallingHearts.map(heart => heart.position.rowIndex);
			const minRowIndex = Math.min(...rowIndexes);

			// 위에서 떨어진 하트 채우기
			fallingHearts.forEach(heart => {
				const { rowIndex } = heart.position;

				targetColumn.cells[rowIndex] = {
					id: heart.id,
					heart: heart.heart,
				};
			});

			// 새로운 하트 생성 및 채우기
			for (let i = minRowIndex - 1; i >= 0; i -= 1) {
				// TODO: 유틸리티 함수로 분리
				let randomHeart;
				do {
					randomHeart = getRandomHeart();
				} while (isHeartsMatchDownwardInColumn(targetColumn, i, randomHeart));

				targetColumn.cells[i] = {
					id: nanoid(),
					heart: randomHeart,
				};
			}
		},
	);

	return newBoard;
}

function rearrangeBoard(board: BoardType, fallingHearts: FallingHeartsType) {
	const heartsByColumn = categoriseHeartsByColumn(fallingHearts);
	const updatedBoard = updateBoardAfterCrush(board, heartsByColumn);

	return updatedBoard;
}

export default rearrangeBoard;
