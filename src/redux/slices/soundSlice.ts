import { createSlice } from '@reduxjs/toolkit';

import { SoundSliceStateType } from '../../types/state.type';

export const soundSlice = createSlice({
	name: 'sound',
	initialState: {
		isSoundActivated: false,
		bgMusic: true,
		soundEffect: true,
	} as SoundSliceStateType,
	reducers: {
		activateSound: state => {
			state.isSoundActivated = true;
		},
	},
});

export const { activateSound } = soundSlice.actions;

export default soundSlice.reducer;
