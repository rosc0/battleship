import { GRID_WIDTH, GRID_HEIGHT, SHIPS_ARRAY } from '../constants';

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

// randomly place ships
export const placeShips = () => {
  const placedShips = [];

  // pick a random square as a starting point
  const pickRandomSquare = () => {
    const x = Math.floor(Math.random() * GRID_WIDTH);
    const y = Math.floor(Math.random() * GRID_HEIGHT);
    return {
      x,
      y,
    };
  };

  // pick a random direction to try and check
  const getRandomDirection = () => {
    const directions = ['up', 'right', 'down', 'left'];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  // check if the ships overlap
  const checkShipOverlap = (x, y) => {
    const { hitIndex } = checkStrikeAttempt(x, y, placedShips);
    if (typeof hitIndex !== 'number') {
      const position = [x, y];
      return position;
    } else {
      return false;
    }
  }

  // check if the ship fits - first check if it fits on the board in that direction
  // then check if there are any other ships overlapping
  // if try return positions of that boat to save to placedShips
  const checkShipFits = (x, y, direction, shipSize) => {  
    let itFits = false;
    let positions = [];

    // check directions
    switch (direction) {
      case 'up':
        if ((y - shipSize) >= 0) {
          for (let i = y; i > (y - shipSize); i--) {
            const position = checkShipOverlap(x, i);
            if (position) {
              itFits = true;
              positions.push(position);
            } else {
              itFits = false;
              break;
            }            
          }
        }
        break;
      case 'right':
        if ((x + shipSize) <= GRID_WIDTH) {
          itFits = true;
          for (let i = x; i < (x + shipSize); i++) {
            const position = checkShipOverlap(i, y);
            if (position) {
              itFits = true;
              positions.push(position);
            } else {
              itFits = false;
              break;
            }              
          }
        }
        break;
      case 'down':
        if ((y + shipSize) <= GRID_HEIGHT) {
          itFits = true;
          for (let i = y; i < (y + shipSize); i++) {
            const position = checkShipOverlap(x, i);
            if (position) {
              itFits = true;
              positions.push(position);
            } else {
              itFits = false;
              break;
            } 
          }
        }
        break;
      case 'left':
        if ((x - shipSize) >= 0) {
          itFits = true;
          for (let i = x; i > (x - shipSize); i--) {
            const position = checkShipOverlap(i, y);
            if (position) {
              itFits = true;
              positions.push(position);
            } else {
              itFits = false;
              break;
            } 
          }
        }
        break;
      default:
        break;
    }

    return {
      itFits,
      positions,
    };
  }

  // place ships on grid, retry till if finds the right place
  const placeShip = (ship) => {
    const shipSize = ship.size;
    
    let x, y, direction = null;
    let fittedShip = {
      itFits: false,
      positions: null,
    };

    while (!fittedShip.itFits) {
      const randomSquare = pickRandomSquare();
      x = randomSquare.x;
      y = randomSquare.y;
      direction = getRandomDirection();
      fittedShip = checkShipFits(x, y, direction, shipSize);
    }    
    
    return {
      name: ship.name,
      positions: fittedShip.positions,
    }
  }

  SHIPS_ARRAY.forEach((ship) => {    
    const placedShip = placeShip(ship);
    placedShips.push(placedShip);
  });

  return placedShips;
};
