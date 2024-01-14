import HEART_ICONS from '../constants/heart.contsant';
import { BoardType } from '../types/board.type';
import { HeartType } from '../types/heart.type';

export function getRandomHeart(): HeartType {
	const hearts: HeartType[] = Object.keys(HEART_ICONS).map(
		Number,
	) as HeartType[];
	return hearts[Math.floor(Math.random() * hearts.length)];
}

export function isHeartsMatch(
	board: BoardType,
	column: number,
	row: number,
	heart: HeartType,
) {
	const currentHeart = heart;

	const isMatchInColumn =
		column > 1 &&
		currentHeart === board[column - 1].cells[row].heart &&
		currentHeart === board[column - 2].cells[row].heart;

	const isMatchInRow =
		row > 1 &&
		currentHeart === board[column].cells[row - 1].heart &&
		currentHeart === board[column].cells[row - 2].heart;

	return isMatchInColumn || isMatchInRow;
}
