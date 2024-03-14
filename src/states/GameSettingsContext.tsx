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
	playSoundEffect: () => {},
	fadeOutBgMusic: () => {},
};

const GameSettingsContext =
	createContext<GameSettingsContextType>(initialContextValue);

function GameSettingsProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer<
		Reducer<GameSettingsStateType, GameSettingsActionType>
	>(gameSettingsReducer, initialState);

	const { screen, popup, soundOptions, unlockedStageNumber, selectedStage } =
		state;

	const { playSoundEffect, fadeOutBgMusic } = useSoundManager(
		soundOptions,
		screen,
		popup,
		selectedStage?.stageNumber,
	);

	const value = useMemo(
		() => ({
			screen,
			popup,
			soundOptions,
			unlockedStageNumber,
			selectedStage,
			dispatchGameSettings: dispatch,
			playSoundEffect,
			fadeOutBgMusic,
		}),
		[
			screen,
			popup,
			soundOptions,
			unlockedStageNumber,
			selectedStage,
			playSoundEffect,
			fadeOutBgMusic,
		],
	);

	return (
		<GameSettingsContext.Provider value={value}>
			{children}
		</GameSettingsContext.Provider>
	);
}

export { GameSettingsContext, GameSettingsProvider };
