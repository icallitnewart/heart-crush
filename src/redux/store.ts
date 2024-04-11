import { configureStore } from '@reduxjs/toolkit';
import localStorage from 'redux-persist/es/storage';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist';

import rootReducer from './reducer';
import { StageTransform } from './transform';
import { StoreStateType } from '../types/state.type';

const persistConfig = {
	key: 'root',
	storage: localStorage,
	whitelist: ['stage'],
	transforms: [StageTransform],
};

const persistedReducer = persistReducer<StoreStateType>(
	persistConfig,
	rootReducer,
);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export default store;
