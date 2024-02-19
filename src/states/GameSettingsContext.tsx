import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import gameSettingsReducer from './gameSettingsReducer';
import { HOME_SCREEN } from '../constants/screen.constant';
import { ScreenType } from '../types/settingsStatus.type';
import {
	GameSettingsActionType,
	GameSettingsContextType,
	GameSettingsStateType,
} from '../types/gameSettings.type';

const initialState = {
	screen: HOME_SCREEN as ScreenType,
	soundOptions: {
		bgMusic: true,
		soundEffect: true,
	},
	maxStageNumber: null,
	selectedStageNumber: null,
};

const initialContextValue: GameSettingsContextType = {
	...initialState,
	dispatch: () => {},
};

const GameSettingsContext =
	createContext<GameSettingsContextType>(initialContextValue);

function GameSettingsProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer<
		Reducer<GameSettingsStateType, GameSettingsActionType>
	>(gameSettingsReducer, initialState);

	const { screen, soundOptions, maxStageNumber, selectedStageNumber } = state;

	const value = useMemo(
		() => ({
			screen,
			soundOptions,
			maxStageNumber,
			selectedStageNumber,
			dispatch,
		}),
		[screen, soundOptions, maxStageNumber, selectedStageNumber],
	);

	return (
		<GameSettingsContext.Provider value={value}>
			{children}
		</GameSettingsContext.Provider>
	);
}

export { GameSettingsContext, GameSettingsProvider };
