import { MOVE_HEART } from '../../constants/heart.constant';
import {
	BoardType,
	BoardStatusType,
	CellPositionType,
	CellType,
} from '../../types/board.type';
import { HeartMovingDirectionType } from '../../types/heart.type';

import { getMovingHearts, simulateHeartSwap } from '../heart';
import { getBoardSize } from '../../utils/boardSize';

function getValidSwapDirection(
	currentCell: CellType,
	position: CellPositionType,
	board: BoardType,
) {
	const swapDirections: HeartMovingDirectionType[] = [
		MOVE_HEART.RIGHT,
		MOVE_HEART.DOWN,
	];

	return swapDirections.find((direction: HeartMovingDirectionType) => {
		const movingHearts = getMovingHearts(
			currentCell,
			direction,
			position,
			board,
		);

		if (movingHearts) {
			const { isSwapValid } = simulateHeartSwap(movingHearts, board);
			if (isSwapValid) return direction;
		}

		return false;
	});
}

function findValidSwap(board: BoardType) {
	const { columns, rows } = getBoardSize(board);

	for (let columnIndex = 0; columnIndex < columns - 1; columnIndex += 1) {
		for (let rowIndex = rows / 2; rowIndex < rows - 1; rowIndex += 1) {
			const currentCell = board[columnIndex].cells[rowIndex];
			const position = { columnIndex, rowIndex };

			const validSwapDirection = getValidSwapDirection(
				currentCell,
				position,
				board,
			);

			if (validSwapDirection) {
				const nextCell =
					validSwapDirection === MOVE_HEART.RIGHT
						? board[columnIndex + 1].cells[rowIndex]
						: board[columnIndex].cells[rowIndex + 1];

				return {
					[currentCell.id]: currentCell,
					[nextCell.id]: nextCell,
				};
			}
		}
	}

	return null;
}

function validateBoard(board: BoardType): BoardStatusType {
	const validSwap = findValidSwap(board);
	const isValid = validSwap !== null;

	return {
		isValid,
		validSwap,
	};
}

export default validateBoard;
