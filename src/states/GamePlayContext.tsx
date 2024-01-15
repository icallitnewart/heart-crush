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
	movingHearts: null,
	isSwipeEnabled: true,
	settings: {
		animationDuration: {
			movingHearts: 0,
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
	const { board, score, move, goal, isSwipeEnabled, movingHearts, settings } =
		state;
	const value = useMemo(
		() => ({
			board,
			score,
			move,
			goal,
			isSwipeEnabled,
			movingHearts,
			dispatch,
			settings,
		}),
		[board, score, move, goal, isSwipeEnabled, settings, movingHearts],
	);

	return (
		<GamePlayContext.Provider value={value}>
			{children}
		</GamePlayContext.Provider>
	);
}

export { GamePlayContext, GamePlayProvider };
