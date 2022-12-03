import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GRID_WIDTH } from '../../constants';
import {
  selectPlayer1Turn,
  incrementShipHits,
  setPlayerScore,
  setGameWon,
  selectShips,
} from '../../store/gameSlice';
import {
  selectPlayer1Grid,
  selectPlayer2ShipLocations,
  setMiss,
  setHit,
} from '../../store/gridSlice';

import { checkStrikeAttempt } from '../../utils/grid.utils';

import GridSquare from '../gridSquare/GridSquare';

import './Grid.styles.scss';

const Grid = () => {
  const dispatch = useDispatch();

  const player1Turn = useSelector(selectPlayer1Turn);
  const player1Grid = useSelector(selectPlayer1Grid);
  const player2ShipLocations = useSelector(selectPlayer2ShipLocations);
  const ships = useSelector(selectShips);

  // handle the click of the square and dispatch events
  const handleClick = (square) => {
    const { x, y } = square;
    const { hitIndex, hitShip } = checkStrikeAttempt(
      x,
      y,
      player2ShipLocations
    );

    const dispatchData = {
      id: square.id,
      player: player1Turn ? 'player1' : 'player2',
    };

    if (typeof hitIndex === 'number') {
      // set hit or miss
      dispatch(setHit(dispatchData));
      // increase ship hits in info window
      dispatch(incrementShipHits(hitShip));    
    } else {
      dispatch(setMiss(dispatchData));
    }
  };

  useEffect(() => {
    const shipCount = ships.length;
    const sunkShipCount = ships.filter((ship) => ship.size === ship.hits).length;

    dispatch(setPlayerScore({
      player: 'player1',
      score: sunkShipCount,
    }));

    if (shipCount === sunkShipCount) {
      dispatch(setGameWon());
    }

  }, [ships, dispatch]);

  return (
    <div className={`grid-container ${player1Turn ? 'player1' : 'player2'}`}>
      <div className='grid' style={{gridTemplateColumns: '1fr '.repeat(GRID_WIDTH)}}>
        {player1Grid.map((gridSquare) => {
          return (
            <GridSquare
              key={gridSquare.id}
              gridSquare={gridSquare}
              clickHandler={() => handleClick(gridSquare)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Grid;
