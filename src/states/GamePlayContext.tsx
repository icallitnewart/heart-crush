import React, { createContext, useMemo, useReducer } from 'react';

import { GamePlayContextType, GamePlayStateType } from '../types/gamePlay';
import gamePlayReducer from './gamePlayReducer';

const initialState: GamePlayStateType = {
	board: [],
	score: 0,
	move: 0,
	goal: {},
};

const initialContextValue: GamePlayContextType = {
	...initialState,
	dispatch: () => {},
};

const GamePlayContext = createContext<GamePlayContextType>(initialContextValue);

function GamePlayProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(gamePlayReducer, initialState);
	const { board, score, move, goal } = state;
	const value = useMemo(
		() => ({ board, score, move, goal, dispatch }),
		[board, score, move, goal],
	);

	return (
		<GamePlayContext.Provider value={value}>
			{children}
		</GamePlayContext.Provider>
	);
}

export { GamePlayContext, GamePlayProvider };
