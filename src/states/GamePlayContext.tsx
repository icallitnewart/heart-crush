import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import {
	GamePlayActionType,
	GamePlayContextType,
	GamePlayStateType,
} from '../types/gamePlay.type';
import gamePlayReducer from './gamePlayReducer';

const initialState: GamePlayStateType = {
	board: [],
	currentStageNumber: null,
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
	isBonusTime: false,
};

const initialContextValue: GamePlayContextType = {
	...initialState,
	dispatchGamePlay: () => {},
};

const GamePlayContext = createContext<GamePlayContextType>(initialContextValue);

function GamePlayProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer<
		Reducer<GamePlayStateType, GamePlayActionType>
	>(gamePlayReducer, initialState);
	const {
		board,
		currentStageNumber,
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
		isBonusTime,
	} = state;
	const value = useMemo(
		() => ({
			board,
			currentStageNumber,
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
			isBonusTime,
			dispatchGamePlay: dispatch,
		}),
		[
			board,
			currentStageNumber,
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
			isBonusTime,
		],
	);

	return (
		<GamePlayContext.Provider value={value}>
			{children}
		</GamePlayContext.Provider>
	);
}

export { GamePlayContext, GamePlayProvider };
