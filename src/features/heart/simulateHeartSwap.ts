import { BoardType } from '../../types/board.type';
import {
	CrushedHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from '../../types/heart.type';

import updateBoardWithSwappedHearts from '../board/updateBoardWithSwappedHearts';
import findMatchedHearts from './findMatchedHearts';
import swapMovingHeartsPosition from './swapMovingHeartsPosition';

function simulateHeartSwap(movingHearts: MovingHeartsType, board: BoardType) {
	const updatedBoard = updateBoardWithSwappedHearts(movingHearts, board);
	const swappedHearts: MovingHeartsType =
		swapMovingHeartsPosition(movingHearts);
	const matchingCandidates: MatchingCandidatesType =
		Object.values(swappedHearts);
	const crushedHearts: CrushedHeartsType = findMatchedHearts(
		updatedBoard,
		matchingCandidates,
	);
	const isSwapValid = crushedHearts.length > 0;

	return {
		updatedBoard,
		swappedHearts,
		matchingCandidates,
		crushedHearts,
		isSwapValid,
	};
}

export default simulateHeartSwap;
