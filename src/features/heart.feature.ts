import HEART_ICONS from '../constants/heart.contsant';
import { BoardType } from '../types/board.type';
import { HeartType, MovingHeartsType } from '../types/heart.type';
import { checkMatching } from '../utils/heart.util';

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

export function swapMovingHeartsPosition(movingHearts: MovingHeartsType) {
	const newMovingHearts: MovingHeartsType = Object.keys(movingHearts).reduce(
		(acc, key) => {
			acc[key] = { ...movingHearts[key] };
			return acc;
		},
		{} as MovingHeartsType,
	);
	const [first, second] = Object.keys(newMovingHearts);

	newMovingHearts[first].position = movingHearts[second].position;
	newMovingHearts[second].position = movingHearts[first].position;

	return newMovingHearts;
}

export function findMatchedHearts(
	board: BoardType,
	swappedHearts: MovingHeartsType,
) {
	const [first, second] = Object.keys(swappedHearts);
	const matchedHearts = new Set([
		...checkMatching(swappedHearts[first], board),
		...checkMatching(swappedHearts[second], board),
	]);

	return Array.from(matchedHearts);
}
