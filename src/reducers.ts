import { combineReducers } from 'redux';
import { createSelectorHook } from 'react-redux';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import newsReducer from './screens/home/reducers/newsReducer';

const persistConfig = {
  key: 'news',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  news: newsReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>;
export const useRootSelectorState = createSelectorHook<RootState>();