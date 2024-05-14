import { createSlice } from '@reduxjs/toolkit';

import { SoundSliceStateType } from '../../types/state.type';
import { ERROR_SLICE } from '../../constants/error.constant';

const initialState: SoundSliceStateType = {
	error: null,
	isSoundActivated: false,
	bgMusic: true,
	soundEffect: true,
};

export const soundSlice = createSlice({
	name: 'sound',
	initialState,
	reducers: {
		setSoundError: (state, action) => {
			const { reason, message } = action.payload;

			state.error = {
				reason,
				message,
				sliceName: ERROR_SLICE.SOUND,
			};
		},
		clearSoundError: state => {
			state.error = null;
		},
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

export const {
	setSoundError,
	clearSoundError,
	activateSound,
	toggleBgMusic,
	toggleSoundEffect,
} = soundSlice.actions;

export default soundSlice.reducer;
