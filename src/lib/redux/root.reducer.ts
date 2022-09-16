import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from '@src/lib/redux/app/app.slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'root',
  storage,
  whitelist: ['app'],
};

const reducers = combineReducers({
  app: appReducer,
});

export const rootReducer = persistReducer(config, reducers);
