import { GamePlayActionType, GamePlayStateType } from '../types/gamePlay.type';
import { BoardType } from '../types/board.type';
import {
	CrushedHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from '../types/heart.type';
import {
	START_BONUS_TIME,
	ADD_BONUS_SCORE,
	END_BONUS_TIME,
	DROP_HEARTS,
	MOVE_HEARTS,
	REARRANGE_BOARD,
	START_GAME,
	RETURN_HEARTS,
	SWAP_HEARTS,
	DISABLE_SWIPE,
	RESET_BOARD,
	CHECK_EXTRA_MATCHING_HEARTS,
} from '../constants/gamePlayActions.constant';
import { GAME_PLAY_INITIAL_STATE as initialState } from '../constants/initialState.constant';

import {
	initialiseBoard,
	rearrangeBoard,
	updateBoardWithSwappedHearts,
	validateBoard,
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
		// 게임 시작
		case START_GAME: {
			const { stage } = action;

			if (stage === undefined) {
				throw new Error(
					'START_GAME action을 위한 stage 정보가 존재하지 않습니다.',
				);
			}

			const { stageNumber, columns, rows, move, goal } = stage;
			const { board, boardStatus } = initialiseBoard(columns, rows);

			return {
				...initialState,
				board,
				boardStatus,
				currentStageNumber: stageNumber,
				score: 0,
				move,
				goal,
			};
		}

		// 보드 초기화
		case RESET_BOARD: {
			const { board } = state;
			const columns = board.length;
			const rows = board[0].cells.length;
			const { board: newBoard, boardStatus } = initialiseBoard(columns, rows);

			return {
				...state,
				board: newBoard,
				boardStatus,
			};
		}

		// 하트 이동 (스와이프로 인해 임시로 이동)
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

		// 하트 스왑 (보드에서 위치 교환)
		case SWAP_HEARTS: {
			const { movingHearts, board, boardStatus, score, move } = state;

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

			// 하트 매칭 성공시
			if (crushedHearts.length > 0) {
				return {
					...state,
					board: updatedBoard,
					boardStatus: {
						...boardStatus,
						validSwap: null,
					},
					move: move - 1,
					crushedHearts,
					score: calculateScoreForCrushedHearts(score, crushedHearts),
					movingHearts: null,
				};
			}

			// 하트 매칭 실패시
			return {
				...state,
				movingHearts: returnMovingHearts(movingHearts),
				isSwipeEnabled: true,
			};
		}

		// 하트 리턴 (원위치로 되돌리기)
		case RETURN_HEARTS: {
			return {
				...state,
				movingHearts: null,
			};
		}

		// 하트 드롭 (밑으로 떨어뜨리기)
		case DROP_HEARTS: {
			const { board, crushedHearts } = state;

			return {
				...state,
				fallingHearts: getFallingHearts(board, crushedHearts),
			};
		}

		// 보드 재배치
		case REARRANGE_BOARD: {
			const { board, fallingHearts } = state;

			return {
				...state,
				board: rearrangeBoard(board, fallingHearts),
				matchingCandidates: pickMatchingCandidates(fallingHearts),
				fallingHearts: [],
			};
		}

		// 크러쉬 후 추가 하트 매칭 검사
		case CHECK_EXTRA_MATCHING_HEARTS: {
			const { board, matchingCandidates, score, move, goal, result } = state;
			const crushedHearts: CrushedHeartsType = findMatchedHearts(
				board,
				matchingCandidates,
			);

			const newState: GamePlayStateType = {
				...state,
				crushedHearts,
				score: calculateScoreForCrushedHearts(score, crushedHearts),
			};

			const isMoveFinished = crushedHearts.length === 0;
			if (isMoveFinished) {
				const newResult = checkForWin(score, goal, move);

				if (result !== newResult) {
					newState.result = newResult;
					newState.isSwipeEnabled = false;
				} else {
					newState.boardStatus = validateBoard(board);
					newState.isSwipeEnabled = true;
				}
			}

			return newState;
		}

		// 보너스 타임 시작
		case START_BONUS_TIME: {
			return {
				...state,
				isBonusTime: true,
			};
		}

		// 보너스 타임 종료
		case END_BONUS_TIME: {
			return {
				...state,
				isBonusTime: false,
			};
		}

		// 보너스 점수 추가
		case ADD_BONUS_SCORE: {
			const { move, score } = state;

			return {
				...state,
				move: move - 1,
				score: calculateBonusScore(score),
			};
		}

		// 스와이프 비활성화
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
