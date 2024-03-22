import React, { Reducer, createContext, useMemo, useReducer } from 'react';

import gamePlayReducer from './gamePlayReducer';
import {
	GamePlayActionType,
	GamePlayContextType,
	GamePlayStateType,
} from '../types/gamePlay.type';
import { GAME_PLAY_INITIAL_STATE as initialState } from '../constants/initialState.constant';

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
		boardStatus,
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
		isBonusTime,
	} = state;
	const value = useMemo(
		() => ({
			board,
			boardStatus,
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
			isBonusTime,
			dispatchGamePlay: dispatch,
		}),
		[
			board,
			boardStatus,
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
