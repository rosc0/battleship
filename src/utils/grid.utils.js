import { GRID_WIDTH, GRID_HEIGHT } from '../constants';

// builds a grid for a player
export const buildGrid = () => {
  const grid = [];
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      grid.push({
        id: `${j}-${i}`,
        x: j,
        y: i,
        hit: false,
        miss: false,
      });
    }
  }
  return grid;
};

// place ships
export const placeShips = () => {
  return [
    {
      name: 'carrier',
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      name: 'battleship',
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      name: 'cruiser',
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      name: 'submarine',
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      name: 'destroyer',
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ];
};

// check if the strike was a hit or miss
export const checkStrikeAttempt = (x, y, placedShips) => {
  const coordString = JSON.stringify([x, y]);
  let hitIndex = null;
  let hitShip = null;

  placedShips.forEach((ship) => {
    ship.positions.forEach((position, index) => {
      const checkCoord = JSON.stringify(position);
      if (coordString === checkCoord) {
        hitIndex = index;
        hitShip = ship.name;
      }
    });
  });

  return {
    hitIndex,
    hitShip,
  };
};
