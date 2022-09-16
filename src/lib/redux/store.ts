import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@src/lib/redux/root.reducer';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import logger from 'redux-logger';

let mids: any[] = [];

if (import.meta.env.DEV) {
  mids.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: false,
    }).concat(mids),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);
