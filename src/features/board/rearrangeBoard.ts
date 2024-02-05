import { nanoid } from 'nanoid';

import { BoardType, CellInfoType } from '../../types/board.type';
import { FallingHeartsType } from '../../types/heart.type';
import { categoriseHeartsByColumn } from '../../utils/heartSorting';
import { getRandomHeart } from '../../utils/heartCreation';
import { isHeartsMatchDownward } from '../../utils/heartMatching';

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
			const rowIndexes = fallingHearts.map(heart => heart.position.rowIndex);
			const minRowIndex = Math.min(...rowIndexes);

			// 위에서 떨어진 하트 채우기
			fallingHearts.forEach(heart => {
				const { rowIndex } = heart.position;

				newBoard[columnIndex].cells[rowIndex] = {
					id: heart.id,
					heart: heart.heart,
				};
			});

			// 새로운 하트 생성 및 채우기
			for (let rowIndex = minRowIndex - 1; rowIndex >= 0; rowIndex -= 1) {
				let randomHeart;
				const position = {
					columnIndex,
					rowIndex,
				};

				do {
					randomHeart = getRandomHeart();
				} while (isHeartsMatchDownward(board, position, randomHeart));

				newBoard[columnIndex].cells[rowIndex] = {
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
