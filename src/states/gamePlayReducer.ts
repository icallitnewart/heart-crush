import { GamePlayActionType, GamePlayStateType } from '../types/gamePlay.type';
import {
	MOVE_HEARTS,
	START_GAME,
	STOP_MOVING_HEARTS,
	SWAP_HEARTS,
} from '../constants/gamePlay.constant';
import {
	initialiseBoard,
	updateBoardWithSwappedHearts,
} from '../features/board.feature';
import {
	findMatchedHearts,
	swapMovingHeartsPosition,
} from '../features/heart.feature';

const gamePlayReducer = (
	state: GamePlayStateType,
	action: GamePlayActionType,
) => {
	switch (action.type) {
		case START_GAME: {
			if (!action.stage) {
				throw new Error(
					'START_GAME action을 위한 stage 정보가 존재하지 않습니다.',
				);
			}

			const { columns, rows, move } = action.stage;
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
			if (action.movingHearts === undefined) {
				throw new Error(
					'MOVE_HEARTS action을 위한 movingHearts 정보가 존재하지 않습니다.',
				);
			}

			return {
				...state,
				movingHearts: action.movingHearts,
			};
		}

		// 하트 교환 시도 (실패시 되돌아오는 애니메이션 효과)
		case SWAP_HEARTS: {
			const { movingHearts, board } = state;
			if (!movingHearts) {
				throw new Error(
					'SWAP_HEARTS action을 위한 movingHearts 정보가 존재하지 않습니다.',
				);
			}

			const updatedBoard = updateBoardWithSwappedHearts(movingHearts, board);
			const swappedHearts = swapMovingHeartsPosition(movingHearts);
			const matchedHearts = findMatchedHearts(updatedBoard, swappedHearts);

			if (matchedHearts.length > 0) {
				return {
					...state,
					board: updatedBoard,
					crushedHearts: matchedHearts,
					movingHearts: null,
				};
			}

			// 매칭 실패시 원위치로 복구
			const [first, second] = Object.keys(movingHearts);
			movingHearts[first].isReturning = true;
			movingHearts[second].isReturning = true;

			return {
				...state,
				movingHearts: { ...movingHearts },
			};
		}

		case STOP_MOVING_HEARTS: {
			return {
				...state,
				movingHearts: null,
			};
		}

		default: {
			return state;
		}
	}
};

export default gamePlayReducer;
