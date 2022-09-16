import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/lib/redux/store';

const selectApp = (state: RootState) => state.app;

export const selectAppOpenCount = createSelector(
  [selectApp],
  (app) => app.openCount,
);
