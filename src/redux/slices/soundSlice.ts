import { createSlice } from '@reduxjs/toolkit';

import { SoundSliceStateType } from '../../types/state.type';

export const soundSlice = createSlice({
	name: 'sound',
	initialState: {
		isSoundActivated: false,
		bgMusic: true,
		soundEffect: true,
	} as SoundSliceStateType,
	reducers: {},
});
export default soundSlice.reducer;
