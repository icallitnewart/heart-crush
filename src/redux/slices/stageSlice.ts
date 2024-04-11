import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
	CurrentStageType,
	StageNumberType,
	StageSliceStateType,
	UnlockedStageType,
} from '../../types/state.type';
import { STAGE_FILES } from '../../constants/stage.constant';

const initialUnlockedStage: UnlockedStageType = {
	maxStageNumber: 1,
};

export const initialCurrentStage: CurrentStageType = {
	data: null,
	timestamp: null,
	loading: false,
	error: null,
};

const initialState: StageSliceStateType = {
	unlockedStage: initialUnlockedStage,
	currentStage: initialCurrentStage,
};

export const fetchStageConfig = createAsyncThunk(
	'stage/fetchStageConfig',
	async (stageNumber: StageNumberType, { rejectWithValue }) => {
		try {
			const filePath = STAGE_FILES[stageNumber];
			const response = await axios.get(filePath);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const stageSlice = createSlice({
	name: 'stage',
	initialState,
	reducers: {
		setUnlockedStage: (state, action) => {
			if (action.payload > state.unlockedStage.maxStageNumber) {
				state.unlockedStage.maxStageNumber = action.payload;
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchStageConfig.fulfilled, (state, action) => {
				state.currentStage.loading = false;
				state.currentStage.data = action.payload;
				state.currentStage.timestamp = Date.now();
			})
			.addCase(fetchStageConfig.rejected, (state, action) => {
				state.currentStage.loading = false;
				state.currentStage.error = action.payload as string;
			})
			.addCase(fetchStageConfig.pending, state => {
				state.currentStage.loading = true;
			});
	},
});

export const { setUnlockedStage } = stageSlice.actions;

export default stageSlice.reducer;
