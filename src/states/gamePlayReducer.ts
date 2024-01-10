import { GamePlayActionType, GamePlayStateType } from '../types/gamePlay';
import { START_GAME } from '../constants/gamePlay';
import { initialiseBoard } from '../features/board';

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

		default: {
			return state;
		}
	}
};

export default gamePlayReducer;
