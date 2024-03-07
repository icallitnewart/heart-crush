import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import gameSettingsReducer from './gameSettingsReducer';
import {
	GameSettingsActionType,
	GameSettingsContextType,
	GameSettingsStateType,
} from '../types/gameSettings.type';
import { GAME_SETTINGS_INITIAL_STATE as initialState } from '../constants/initialState.constant';
import useSoundManager from '../hooks/useSoundManager';

const initialContextValue: GameSettingsContextType = {
	...initialState,
	dispatchGameSettings: () => {},
	playBgMusic: () => {},
};

const GameSettingsContext =
	createContext<GameSettingsContextType>(initialContextValue);

function GameSettingsProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer<
		Reducer<GameSettingsStateType, GameSettingsActionType>
	>(gameSettingsReducer, initialState);

	const { screen, popup, soundOptions, unlockedStageNumber, selectedStage } =
		state;

	const { playBgMusic } = useSoundManager(soundOptions);

	const value = useMemo(
		() => ({
			screen,
			popup,
			soundOptions,
			unlockedStageNumber,
			selectedStage,
			dispatchGameSettings: dispatch,
			playBgMusic,
		}),
		[
			screen,
			popup,
			soundOptions,
			unlockedStageNumber,
			selectedStage,
			playBgMusic,
		],
	);

	return (
		<GameSettingsContext.Provider value={value}>
			{children}
		</GameSettingsContext.Provider>
	);
}

export { GameSettingsContext, GameSettingsProvider };
