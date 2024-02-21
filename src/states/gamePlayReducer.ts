import { GamePlayActionType, GamePlayStateType } from '../types/gamePlay.type';
import {
	START_BONUS_TIME,
	ADD_BONUS_SCORE,
	CHECK_MATCHING_HEARTS,
	END_BONUS_TIME,
	DROP_HEARTS,
	MOVE_HEARTS,
	REARRANGE_BOARD,
	START_GAME,
	STOP_MOVING_HEARTS,
	SWAP_HEARTS,
	DISABLE_SWIPE,
} from '../constants/gamePlayActions.constant';
import { BoardType } from '../types/board.type';
import {
	CrushedHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from '../types/heart.type';
import {
	initialiseBoard,
	rearrangeBoard,
	updateBoardWithSwappedHearts,
} from '../features/board';
import {
	findMatchedHearts,
	getFallingHearts,
	pickMatchingCandidates,
	returnMovingHearts,
	swapMovingHeartsPosition,
} from '../features/heart';
import {
	calculateScoreForCrushedHearts,
	calculateBonusScore,
} from '../features/score';
import { checkForWin } from '../features/result';

const gamePlayReducer = (
	state: GamePlayStateType,
	action: GamePlayActionType,
) => {
	switch (action.type) {
		case START_GAME: {
			const { stage } = action;

			if (stage === undefined) {
				throw new Error(
					'START_GAME action을 위한 stage 정보가 존재하지 않습니다.',
				);
			}

			const { stageNumber, columns, rows, move, goal } = stage;

			return {
				...state,
				board: initialiseBoard(columns, rows),
				currentStageNumber: stageNumber,
				score: 0,
				move,
				goal,
			};
		}

		// 하트 이동 시작 애니메이션 효과
		case MOVE_HEARTS: {
			const { movingHearts } = action;

			if (movingHearts === undefined) {
				throw new Error(
					'MOVE_HEARTS action을 위한 movingHearts 정보가 존재하지 않습니다.',
				);
			}

			return {
				...state,
				movingHearts,
			};
		}

		case SWAP_HEARTS: {
			const { movingHearts, board, score, move } = state;

			if (!movingHearts) {
				throw new Error(
					'SWAP_HEARTS action을 위한 movingHearts 정보가 존재하지 않습니다.',
				);
			}

			const updatedBoard: BoardType = updateBoardWithSwappedHearts(
				movingHearts,
				board,
			);
			const swappedHearts: MovingHeartsType =
				swapMovingHeartsPosition(movingHearts);
			const matchingCandidates: MatchingCandidatesType =
				Object.values(swappedHearts);
			const crushedHearts: CrushedHeartsType = findMatchedHearts(
				updatedBoard,
				matchingCandidates,
			);

			if (crushedHearts.length > 0) {
				return {
					...state,
					board: updatedBoard,
					move: move - 1,
					crushedHearts,
					score: calculateScoreForCrushedHearts(score, crushedHearts),
					movingHearts: null,
				};
			}

			return {
				...state,
				movingHearts: returnMovingHearts(movingHearts),
				isSwipeEnabled: true,
			};
		}

		case STOP_MOVING_HEARTS: {
			return {
				...state,
				movingHearts: null,
			};
		}

		case DROP_HEARTS: {
			const { board, crushedHearts } = state;

			return {
				...state,
				fallingHearts: getFallingHearts(board, crushedHearts),
			};
		}

		case REARRANGE_BOARD: {
			const { board, fallingHearts } = state;

			return {
				...state,
				board: rearrangeBoard(board, fallingHearts),
				matchingCandidates: pickMatchingCandidates(fallingHearts),
				fallingHearts: [],
			};
		}

		case CHECK_MATCHING_HEARTS: {
			const { board, matchingCandidates, score, move, goal, result } = state;
			const crushedHearts: CrushedHeartsType = findMatchedHearts(
				board,
				matchingCandidates,
			);

			let newResult = result;
			const isMoveFinished = crushedHearts.length === 0;
			if (isMoveFinished) {
				newResult = checkForWin(score, goal, move);
			}

			return {
				...state,
				crushedHearts,
				score: calculateScoreForCrushedHearts(score, crushedHearts),
				...(isMoveFinished && { isSwipeEnabled: true }),
				...(result !== newResult && {
					result: newResult,
					isSwipeEnabled: false,
				}),
			};
		}

		case START_BONUS_TIME: {
			return {
				...state,
				isBonusTime: true,
			};
		}

		case END_BONUS_TIME: {
			return {
				...state,
				isBonusTime: false,
			};
		}

		case ADD_BONUS_SCORE: {
			const { move, score } = state;

			return {
				...state,
				move: move - 1,
				score: calculateBonusScore(score),
			};
		}

		case DISABLE_SWIPE: {
			return {
				...state,
				isSwipeEnabled: false,
			};
		}

		default: {
			return state;
		}
	}
};

export default gamePlayReducer;
