import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dbName, dbPass, dbURL, dbUser } from '@src/config/env';
import { ReducerName } from '@src/lib/redux/constsnts/reducer.names';

type DBCred = {
  url: string;
  user: string;
  pass: string;
  NS: string;
  db: string;
};

interface AppState {
  openCount: number;
  databaseCred: DBCred;
}

const initialState: AppState = {
  openCount: 0,
  databaseCred: {
    url: dbURL,
    db: dbName,
    NS: dbName,
    pass: dbPass,
    user: dbUser,
  },
};

const appSlice = createSlice({
  name: ReducerName.app,
  initialState,
  reducers: {
    increaseOpenCount: (state) => {
      state.openCount = state.openCount + 1;
    },
    setDBCreds: (state, action: PayloadAction<Partial<DBCred>>) => {
      state.databaseCred = {
        ...state.databaseCred,
        ...action.payload,
      };
    },
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
