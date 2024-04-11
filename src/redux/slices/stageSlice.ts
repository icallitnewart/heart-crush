import { createSlice } from '@reduxjs/toolkit';

import { StageSliceStateType } from '../../types/state.type';

const initialState: StageSliceStateType = {
	unlockedStage: { maxStageNumber: 1 },
	selectedStage: null,
	currentStage: null,
};

export const stageSlice = createSlice({
	name: 'stage',
	initialState,
	reducers: {},
});

export default stageSlice.reducer;
