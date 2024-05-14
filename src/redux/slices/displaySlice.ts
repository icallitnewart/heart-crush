import { createSlice } from '@reduxjs/toolkit';

import {
	DisplaySliceStateType,
	PopupType,
	ScreenType,
} from '../../types/state.type';
import { POPUP, SCREEN } from '../../constants/screen.constant';
import { ERROR_SLICE } from '../../constants/error.constant';

const initialState: DisplaySliceStateType = {
	error: null,
	screen: SCREEN.HOME as ScreenType,
	popup: POPUP.SOUND_ALERT as PopupType,
};

export const displaySlice = createSlice({
	name: 'display',
	initialState,
	reducers: {
		setDisplayError: (state, action) => {
			const { reason, message } = action.payload;

			state.error = {
				reason,
				message,
				sliceName: ERROR_SLICE.DISPLAY,
			};
		},
		clearDisplayError: state => {
			state.error = null;
		},
		switchScreen: (state, action) => {
			state.screen = action.payload;
		},
		openPopup: (state, action) => {
			state.popup = action.payload;
		},
		closePopup: state => {
			state.popup = null;
		},
	},
});

export const {
	setDisplayError,
	clearDisplayError,
	switchScreen,
	openPopup,
	closePopup,
} = displaySlice.actions;

export default displaySlice.reducer;
