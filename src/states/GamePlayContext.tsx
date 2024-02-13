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
	result: null,
	crushedHearts: [],
	fallingHearts: [],
	matchingCandidates: [],
	movingHearts: null,
	isSwipeEnabled: true,
	popup: null,
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
		result,
		movingHearts,
		fallingHearts,
		crushedHearts,
		matchingCandidates,
		isSwipeEnabled,
		popup,
	} = state;
	const value = useMemo(
		() => ({
			board,
			score,
			move,
			goal,
			result,
			movingHearts,
			fallingHearts,
			crushedHearts,
			matchingCandidates,
			isSwipeEnabled,
			popup,
			dispatch,
		}),
		[
			board,
			score,
			move,
			goal,
			result,
			movingHearts,
			fallingHearts,
			crushedHearts,
			matchingCandidates,
			isSwipeEnabled,
			popup,
		],
	);

	return (
		<GamePlayContext.Provider value={value}>
			{children}
		</GamePlayContext.Provider>
	);
}

export { GamePlayContext, GamePlayProvider };
