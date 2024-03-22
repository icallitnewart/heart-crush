import {
	HeartMovingDirectionType,
	MovingHeartsType,
} from '../../types/heart.type';
import { BoardType, CellPositionType, CellType } from '../../types/board.type';

import {
	getNearHeart,
	getNearHeartPosition,
	getOppositeMovingDirection,
} from '../../utils/heartSwipe';

function getMovingHearts(
	currentCell: CellType,
	direction: HeartMovingDirectionType,
	position: CellPositionType,
	board: BoardType,
): MovingHeartsType | null {
	const rows = board[0].cells.length;
	const nearHeart = getNearHeart(board, position, rows, direction);
	if (!nearHeart) return null;

	const oppositeDirection = getOppositeMovingDirection(direction);
	const nearHeartPosition = getNearHeartPosition(position, direction);
	const movingHearts: MovingHeartsType = {
		[currentCell.id]: {
			heart: currentCell.heart,
			direction,
			position,
			isReturning: false,
		},
		[nearHeart.id]: {
			heart: nearHeart.heart,
			direction: oppositeDirection,
			position: nearHeartPosition,
			isReturning: false,
		},
	};

	return movingHearts;
}

export default getMovingHearts;
