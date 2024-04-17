import { createSlice } from '@reduxjs/toolkit';

import { GameSliceStateType } from '../../types/state.type';

const initialState: GameSliceStateType = {
	board: [],
	boardStatus: {
		isValid: null,
		validSwap: null,
	},
	score: 0,
	move: 0,
	goal: {},
	result: null,
	crushedHearts: [],
	fallingHearts: [],
	matchingCandidates: [],
	movingHearts: null,
	isSwipeEnabled: true,
	isBonusTime: false,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {},
});

export default gameSlice.reducer;
