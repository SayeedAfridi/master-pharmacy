import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '@src/lib/redux/constsnts/reducer.names';

interface AppState {
  openCount: number;
}

const initialState: AppState = {
  openCount: 0,
};

const appSlice = createSlice({
  name: ReducerName.app,
  initialState,
  reducers: {
    increaseOpenCount: (state) => {
      state.openCount = state.openCount + 1;
    },
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
