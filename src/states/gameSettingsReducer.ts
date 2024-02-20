import {
	SELECT_STAGE,
	SET_MAX_STAGE_NUMBER,
	SWITCH_SCREEN,
} from '../constants/gameSettingsActions.constant';
import {
	GameSettingsActionType,
	GameSettingsStateType,
} from '../types/gameSettings.type';

const gameSettingsReducer = (
	state: GameSettingsStateType,
	action: GameSettingsActionType,
) => {
	switch (action.type) {
		case SWITCH_SCREEN: {
			const { screen } = action;

			if (screen === undefined) {
				throw new Error(
					'SWITCH_SCREEN action을 위한 screen 정보가 존재하지 않습니다.',
				);
			}

			return {
				...state,
				screen,
			};
		}

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

		case SELECT_STAGE: {
			const { selectedStageNumber } = action;

			if (selectedStageNumber === undefined) {
				throw new Error(
					'SELECT_STAGE action을 위한 selectedStageNumber 정보가 존재하지 않습니다.',
				);
			}

			return {
				...state,
				selectedStageNumber,
			};
		}

		default: {
			return state;
		}
	}
};

export default gameSettingsReducer;
