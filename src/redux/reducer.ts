import { combineReducers } from '@reduxjs/toolkit';

import displayReducer from './slices/displaySlice';
import soundReducer from './slices/soundSlice';
import stageReducer from './slices/stageSlice';

const rootReducer = combineReducers({
	display: displayReducer,
	sound: soundReducer,
	stage: stageReducer,
});

export default rootReducer;
