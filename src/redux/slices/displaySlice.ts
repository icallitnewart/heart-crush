import { createSlice } from '@reduxjs/toolkit';

import {
	DisplaySliceStateType,
	PopupType,
	ScreenType,
} from '../../types/state.type';
import { POPUP, SCREEN } from '../../constants/screen.constant';

const initialState: DisplaySliceStateType = {
	screen: SCREEN.HOME as ScreenType,
	popup: POPUP.SOUND_ALERT as PopupType,
};

export const displaySlice = createSlice({
	name: 'display',
	initialState,
	reducers: {
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

export const { switchScreen, openPopup, closePopup } = displaySlice.actions;

export default displaySlice.reducer;
