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
		toggleBgMusic: state => {
			state.bgMusic = !state.bgMusic;
		},
	},
});

export const { activateSound, toggleBgMusic } = soundSlice.actions;

export default soundSlice.reducer;
