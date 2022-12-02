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
      const { payload } = action;
      if (payload === 'player1' || payload === 'player2') {
        state[payload].grid = buildGrid();
      }
    },
    setShips: (state, action) => {
      const { payload } = action;
      if (payload === 'player1' || payload === 'player2') {
        state[payload].shipLocations = placeShips();
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
// export const selectPlayer1ShipLocations = (state) => state.grid.player1.shipLocations;
// export const selectPlayer2Grid = (state) => state.grid.player2.grid;
export const selectPlayer2ShipLocations = (state) =>
  state.grid.player2.shipLocations;

export default gridSlice.reducer;