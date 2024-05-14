import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
	CurrentStageType,
	StageNumberType,
	StageSliceStateType,
	UnlockedStageType,
} from '../../types/state.type';
import { STAGE_FILES } from '../../constants/stage.constant';
import { ERROR_SLICE } from '../../constants/error.constant';

const initialUnlockedStage: UnlockedStageType = {
	maxStageNumber: 1,
};

const initialCurrentStage: CurrentStageType = {
	data: null,
	timestamp: null,
	loading: false,
	error: null,
};

const initialState: StageSliceStateType = {
	error: null,
	unlockedStage: initialUnlockedStage,
	currentStage: initialCurrentStage,
};

export const initialStageState = initialState;

export const fetchStageConfig = createAsyncThunk(
	'stage/fetchStageConfig',
	async (stageNumber: StageNumberType, { rejectWithValue }) => {
		// TODO: timestamp 설정
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
		setStageError: (state, action) => {
			const { reason, message } = action.payload;

			state.error = {
				reason,
				message,
				sliceName: ERROR_SLICE.STAGE,
			};
		},
		clearStageError: state => {
			state.error = null;
		},
		setUnlockedStage: (state, action) => {
			if (action.payload > state.unlockedStage.maxStageNumber) {
				state.unlockedStage.maxStageNumber = action.payload;
			}
		},
		clearCurrentStage: state => {
			if (state.currentStage.data) state.currentStage = initialCurrentStage;
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

export const {
	setStageError,
	clearStageError,
	setUnlockedStage,
	clearCurrentStage,
} = stageSlice.actions;

export default stageSlice.reducer;
