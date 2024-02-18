import { SET_MAX_STAGE_NUMBER } from '../constants/gameSettings.constant';
import {
	GameSettingsActionType,
	GameSettingsStateType,
} from '../types/gameSettings.type';

const gameSettingsReducer = (
	state: GameSettingsStateType,
	action: GameSettingsActionType,
) => {
	switch (action.type) {
		case SET_MAX_STAGE_NUMBER: {
			const { maxStageNumber } = action;

			if (maxStageNumber === undefined) {
				throw new Error(
					'SET_MAX_STAGE_NUMBER action을 위한 maxStageNumber 정보가 존재하지 않습니다.',
				);
			}

			return {
				...state,
				maxStageNumber,
			};
		}

		default: {
			return state;
		}
	}
};

export default gameSettingsReducer;
