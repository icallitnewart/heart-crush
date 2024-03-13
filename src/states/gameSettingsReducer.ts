import {
	CLOSE_POPUP,
	TOGGLE_BG_MUSIC,
	OPEN_POPUP,
	SELECT_STAGE,
	SET_UNLOCKED_STAGE_NUMBER,
	SWITCH_SCREEN,
	TOGGLE_SOUND_EFFECT,
} from '../constants/gameSettingsActions.constant';
import {
	GameSettingsActionType,
	GameSettingsStateType,
} from '../types/gameSettings.type';
import { getMaxStageNumber } from '../features/stage';

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

		case OPEN_POPUP: {
			const { popup } = action;

			if (popup === undefined) {
				throw new Error(
					'OPEN_POPUP action을 위한 popup 정보가 존재하지 않습니다.',
				);
			}

			return {
				...state,
				popup,
			};
		}

		case CLOSE_POPUP: {
			return {
				...state,
				popup: null,
			};
		}

		case SET_UNLOCKED_STAGE_NUMBER: {
			return {
				...state,
				unlockedStageNumber: getMaxStageNumber(),
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
				selectedStage: {
					stageNumber: selectedStageNumber,
					timestamp: Date.now(),
				},
			};
		}

		case TOGGLE_BG_MUSIC: {
			const { soundOptions } = state;
			const { bgMusic } = soundOptions;

			return {
				...state,
				soundOptions: {
					...soundOptions,
					bgMusic: !bgMusic,
				},
			};
		}

		case TOGGLE_SOUND_EFFECT: {
			const { soundOptions } = state;
			const { soundEffect } = soundOptions;

			return {
				...state,
				soundOptions: {
					...soundOptions,
					soundEffect: !soundEffect,
				},
			};
		}

		default: {
			return state;
		}
	}
};

export default gameSettingsReducer;
