import { combineReducers } from '@reduxjs/toolkit';

import displayReducer from './slices/displaySlice';
import soundReducer from './slices/soundSlice';
import stageReducer from './slices/stageSlice';
import GameReducer from './slices/gameSlice';

const rootReducer = combineReducers({
	display: displayReducer,
	sound: soundReducer,
	stage: stageReducer,
	game: GameReducer,
});

export default rootReducer;
