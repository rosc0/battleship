import { createSlice } from '@reduxjs/toolkit';
import { SHIPS_ARRAY } from '../constants';

const initialState = {
  gameStarted: false,
  gameWon: false,
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
      state.gameWon = false;
    },
    togglePlayersTurn: (state) => {
      state.player1Turn = !state.player1Turn;
    },
    setPlayerScore: (state, action) => {
      const { player, score } = action.payload;
      if (player === 'player1' || player === 'player2') {
        state.score[player] = score;
      }
    },
    incrementShipHits: (state, action) => {
      state.ships = state.ships.map((ship) => {
        if (ship.id === action.payload.ship.id) {
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
    },  
    resetScores: (state) => {
      state.score = initialState.score;
      state.ships = initialState.ships;
    },
  },
});

export const {
  startGame,
  togglePlayersTurn,
  setPlayerScore,
  incrementShipHits,
  setGameWon,
  resetScores,
} = gameSlice.actions;

export const selectPlayer1Turn = (state) => state.game.player1Turn;
export const selectGameStarted = (state) => state.game.gameStarted;
export const selectPlayer1Score = (state) => state.game.score.player1;
export const selectPlayer2Score = (state) => state.game.score.player2;
export const selectShips = (state) => state.game.ships;
export const selectGameWon = (state) => state.game.gameWon;

export default gameSlice.reducer;
