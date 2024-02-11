import { GamePlayActionType, GamePlayStateType } from '../types/gamePlay.type';
import {
	CHECK_MATCHING_HEARTS,
	DROP_HEARTS,
	MOVE_HEARTS,
	REARRANGE_BOARD,
	START_GAME,
	STOP_MOVING_HEARTS,
	SWAP_HEARTS,
} from '../constants/gamePlay.constant';
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
import { calculateScoreForCrushedHearts } from '../features/score';

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

			const { columns, rows, move } = stage;

			return {
				...state,
				board: initialiseBoard(columns, rows),
				score: 0,
				move,
				goal: {
					score: 1000,
				},
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

		// 하트 교환 시도 (실패시 되돌아오는 애니메이션 효과)
		case SWAP_HEARTS: {
			const { movingHearts, board, score } = state;

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
					crushedHearts,
					score: calculateScoreForCrushedHearts(score, crushedHearts),
					movingHearts: null,
				};
			}

			return {
				...state,
				movingHearts: returnMovingHearts(movingHearts),
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
			const { board, matchingCandidates, score } = state;
			const crushedHearts: CrushedHeartsType = findMatchedHearts(
				board,
				matchingCandidates,
			);

			return {
				...state,
				crushedHearts,
				score: calculateScoreForCrushedHearts(score, crushedHearts),
			};
		}

		default: {
			return state;
		}
	}
};

export default gamePlayReducer;
