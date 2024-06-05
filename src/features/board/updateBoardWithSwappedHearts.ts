import { BoardType } from '../../types/board.type';
import { MovingHeartsType } from '../../types/heart.type';

function updateBoardWithSwappedHearts(
	targetHearts: MovingHeartsType,
	board: BoardType,
) {
	const newBoard = board.map(column => ({
		...column,
		cells: [...column.cells],
	}));
	const [first, second] = Object.keys(targetHearts);
	const { columnIndex: columnIndex1, rowIndex: rowIndex1 } =
		targetHearts[first].position;
	const { columnIndex: columnIndex2, rowIndex: rowIndex2 } =
		targetHearts[second].position;

	[
		newBoard[columnIndex1].cells[rowIndex1],
		newBoard[columnIndex2].cells[rowIndex2],
	] = [
		newBoard[columnIndex2].cells[rowIndex2],
		newBoard[columnIndex1].cells[rowIndex1],
	];

	return newBoard;
}

export default updateBoardWithSwappedHearts;
