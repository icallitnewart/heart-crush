import HEART_ICONS from '../constants/heart.constant';
import { BoardType, CellInfoType } from '../types/board.type';
import { HeartType } from '../types/common.type';
import {
	FallingHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from '../types/heart.type';
import {
	categoriseHeartsByColumn,
	checkMatching,
	findFallingHearts,
} from '../utils/heart.util';

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
	targetHearts: MatchingCandidatesType,
) {
	const matchedHeartsMap = new Map();

	targetHearts.forEach(heart => {
		const foundMatchedHearts = checkMatching(heart, board);

		foundMatchedHearts.forEach(foundMatchedHeart => {
			matchedHeartsMap.set(foundMatchedHeart.id, foundMatchedHeart);
		});
	});

	const matchedHearts = Array.from(matchedHeartsMap.values());
	return matchedHearts;
}

export function getFallingHearts(
	board: BoardType,
	crushedHearts: CellInfoType[],
) {
	const heartsByColumn = categoriseHeartsByColumn(crushedHearts);
	const fallingHearts = findFallingHearts(board, heartsByColumn);
	return fallingHearts;
}

export function pickMatchingCandidates(fallingHearts: FallingHeartsType) {
	const targetHearts = fallingHearts
		.filter(({ position }) => position.rowIndex >= 10)
		.map(({ distance, ...rest }) => rest);

	return targetHearts;
}
