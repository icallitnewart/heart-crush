import { GamePlayActionType, GamePlayStateType } from '../types/gamePlay.type';
import { START_GAME, SWAP_HEARTS } from '../constants/gamePlay.constant';
import { initialiseBoard } from '../features/board.feature';

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

		case SWAP_HEARTS: {
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

		default: {
			return state;
		}
	}
};

export default gamePlayReducer;
