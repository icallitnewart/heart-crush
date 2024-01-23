import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import {
	GamePlayActionType,
	GamePlayContextType,
	GamePlayStateType,
} from '../types/gamePlay.type';
import gamePlayReducer from './gamePlayReducer';

const initialState: GamePlayStateType = {
	board: [],
	score: 0,
	move: 0,
	goal: {},
	crushedHearts: [],
	movingHearts: null,
	isSwipeEnabled: true,
	settings: {
		// TODO: 상수로 분리
		animationDuration: {
			movingHearts: 200,
			crushedHearts: 1000,
		},
	},
};

const initialContextValue: GamePlayContextType = {
	...initialState,
	dispatch: () => {},
};

const GamePlayContext = createContext<GamePlayContextType>(initialContextValue);

function GamePlayProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer<
		Reducer<GamePlayStateType, GamePlayActionType>
	>(gamePlayReducer, initialState);
	const {
		board,
		score,
		move,
		goal,
		isSwipeEnabled,
		movingHearts,
		settings,
		crushedHearts,
	} = state;
	const value = useMemo(
		() => ({
			board,
			score,
			move,
			goal,
			isSwipeEnabled,
			movingHearts,
			crushedHearts,
			dispatch,
			settings,
		}),
		[
			board,
			score,
			move,
			goal,
			isSwipeEnabled,
			settings,
			movingHearts,
			crushedHearts,
		],
	);

	return (
		<GamePlayContext.Provider value={value}>
			{children}
		</GamePlayContext.Provider>
	);
}

export { GamePlayContext, GamePlayProvider };
