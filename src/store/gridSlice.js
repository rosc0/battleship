import { createSlice } from '@reduxjs/toolkit';
import { buildGrid, placeShips } from '../utils/grid.utils';

const initialState = {
  player1: {
    grid: [],
    shipLocations: [],
  },
  player2: {
    grid: [],
    shipLocations: [],
  },
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGrid: (state, action) => {
      const { player } = action.payload;
      if (player === 'player1' || player === 'player2') {
        state[player].grid = buildGrid();
      }
    },
    setShips: (state, action) => {
      const { player } = action.payload;
      if (player === 'player1' || player === 'player2') {
        state[player].shipLocations = placeShips();
      }
    },
    setHit: (state, action) => {
      const { id, player } = action.payload;
      if (id && player) {
        state[player].grid = state[player].grid.map((gridSquare) => {
          if (gridSquare.id === id) {
            return {
              ...gridSquare,
              hit: true,
            };
          } else {
            return gridSquare;
          }
        });
      }
    },
    setMiss: (state, action) => {
      const { id, player } = action.payload;
      if (id && player) {
        state[player].grid = state[player].grid.map((gridSquare) => {
          if (gridSquare.id === id) {
            return {
              ...gridSquare,
              miss: true,
            };
          } else {
            return gridSquare;
          }
        });
      }
    },
  },
});

export const { setGrid, setShips, setHit, setMiss } = gridSlice.actions;

export const selectPlayer1Grid = (state) => state.grid.player1.grid;
export const selectPlayer2ShipLocations = (state) =>
  state.grid.player2.shipLocations;

export default gridSlice.reducer;
