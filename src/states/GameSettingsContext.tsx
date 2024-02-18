import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import gameSettingsReducer from './gameSettingsReducer';
import {
	GameSettingsActionType,
	GameSettingsContextType,
	GameSettingsStateType,
} from '../types/gameSettings.type';

const initialState = {
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

	const { soundOptions, maxStageNumber, selectedStageNumber } = state;
	const value = useMemo(
		() => ({ soundOptions, maxStageNumber, selectedStageNumber, dispatch }),
		[soundOptions, maxStageNumber, selectedStageNumber],
	);

	return (
		<GameSettingsContext.Provider value={value}>
			{children}
		</GameSettingsContext.Provider>
	);
}

export { GameSettingsContext, GameSettingsProvider };
