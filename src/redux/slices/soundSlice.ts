import { createSlice } from '@reduxjs/toolkit';

import { SoundSliceStateType } from '../../types/state.type';

const initialState: SoundSliceStateType = {
	isSoundActivated: false,
	bgMusic: true,
	soundEffect: true,
};

export const soundSlice = createSlice({
	name: 'sound',
	initialState,
	reducers: {
		activateSound: state => {
			state.isSoundActivated = true;
		},
		toggleBgMusic: state => {
			state.bgMusic = !state.bgMusic;
		},
		toggleSoundEffect: state => {
			state.soundEffect = !state.soundEffect;
		},
	},
});

export const { activateSound, toggleBgMusic, toggleSoundEffect } =
	soundSlice.actions;

export default soundSlice.reducer;
