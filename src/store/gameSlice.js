import { createSlice } from '@reduxjs/toolkit';
import { SHIPS_ARRAY } from '../constants';

const initialState = {
  gameStarted: false,
  player1Turn: true,
  score: {
    player1: 0,
    player2: 0,
  },
  ships: SHIPS_ARRAY.map((ship) => ({ ...ship, hits: 0 })),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
    },
    togglePlayersTurn: (state) => {
      state.player1Turn = !state.player1Turn;
    },
    incrementScore: (state, action) => {
      state.score[action.payload]++;
    },
    incrementShipHits: (state, action) => {
      state.ships = state.ships.map((ship) => {
        if (ship.name === action.payload) {
          return {
            ...ship,
            hits: ship.hits + 1,
          };
        } else {
          return ship;
        }
      });
    },
  },
});

export const {
  startGame,
  togglePlayersTurn,
  incrementScore,
  incrementShipHits,
} = gameSlice.actions;

export const selectPlayer1Turn = (state) => state.game.player1Turn;
export const selectGameStarted = (state) => state.game.gameStarted;
export const selectPlayer1Score = (state) => state.game.score.player1;
export const selectPlayer2Score = (state) => state.game.score.player2;
export const selectShips = (state) => state.game.ships;

export default gameSlice.reducer;
