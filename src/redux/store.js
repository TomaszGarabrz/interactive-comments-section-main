import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appRedux';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
