import { createSlice } from '@reduxjs/toolkit';

import { DisplaySliceStateType } from '../../types/state.type';
import { POPUP, SCREEN } from '../../constants/screen.constant';

export const displaySlice = createSlice({
	name: 'display',
	initialState: {
		screen: SCREEN.HOME,
		popup: POPUP.SOUND_ALERT,
	} as DisplaySliceStateType,
	reducers: {},
});

export default displaySlice.reducer;
