import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import gridReducer from './gridSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    grid: gridReducer,
  },
});
