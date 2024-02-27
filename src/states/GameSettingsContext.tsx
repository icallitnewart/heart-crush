import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import gameSettingsReducer from './gameSettingsReducer';
import {
	GameSettingsActionType,
	GameSettingsContextType,
	GameSettingsStateType,
} from '../types/gameSettings.type';
import { GAME_SETTINGS_INITIAL_STATE as initialState } from '../constants/initialState.constant';

const initialContextValue: GameSettingsContextType = {
	...initialState,
	dispatchGameSettings: () => {},
};

const GameSettingsContext =
	createContext<GameSettingsContextType>(initialContextValue);

function GameSettingsProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer<
		Reducer<GameSettingsStateType, GameSettingsActionType>
	>(gameSettingsReducer, initialState);

	const { screen, popup, soundOptions, maxStageNumber, selectedStageNumber } =
		state;

	const value = useMemo(
		() => ({
			screen,
			popup,
			soundOptions,
			maxStageNumber,
			selectedStageNumber,
			dispatchGameSettings: dispatch,
		}),
		[screen, popup, soundOptions, maxStageNumber, selectedStageNumber],
	);

	return (
		<GameSettingsContext.Provider value={value}>
			{children}
		</GameSettingsContext.Provider>
	);
}

export { GameSettingsContext, GameSettingsProvider };
