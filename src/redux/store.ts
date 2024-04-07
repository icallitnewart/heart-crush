import { configureStore } from '@reduxjs/toolkit';

import displayReducer from './slices/displaySlice';

const store = configureStore({
	reducer: {
		display: displayReducer,
	},
});

export default store;
