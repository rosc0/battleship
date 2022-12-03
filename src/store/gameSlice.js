import { createSlice } from '@reduxjs/toolkit';
import { SHIPS_ARRAY } from '../constants';

const initialState = {
  gameStarted: false,
  gameWon: false,
  player1Turn: true,
  score: {
    player1: 0,
    player2: 0,
    toWin: SHIPS_ARRAY.reduce((acc, ship) => (acc = acc + ship.size), 0)
  },
  ships: SHIPS_ARRAY.map((ship) => ({ ...ship, hits: 0 })),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
      state.gameWon = false;
    },
    togglePlayersTurn: (state) => {
      state.player1Turn = !state.player1Turn;
    },
    incrementScore: (state, action) => {
      const { payload } = action;
      if (payload === 'player1' || payload === 'player2') {
        state.score[payload]++;
      }
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
    setGameWon: (state) => {
      state.gameStarted = false;
      state.gameWon = true;
      state.score = initialState.score;
      state.ships = initialState.ships
    },  
  },
});

export const {
  startGame,
  togglePlayersTurn,
  incrementScore,
  incrementShipHits,
  setGameWon,
} = gameSlice.actions;

export const selectPlayer1Turn = (state) => state.game.player1Turn;
export const selectGameStarted = (state) => state.game.gameStarted;
export const selectPlayer1Score = (state) => state.game.score.player1;
export const selectPlayer2Score = (state) => state.game.score.player2;
export const selectShips = (state) => state.game.ships;
export const selectScoreToWin = (state) => state.game.score.toWin;
export const selectGameWon = (state) => state.game.gameWon;

export default gameSlice.reducer;
