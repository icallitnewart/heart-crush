import { configureStore } from '@reduxjs/toolkit';

import displayReducer from './slices/displaySlice';
import soundReducer from './slices/soundSlice';

const store = configureStore({
	reducer: {
		display: displayReducer,
		sound: soundReducer,
	},
});

export default store;
