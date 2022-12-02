import { useSelector, useDispatch } from 'react-redux';
import {
  selectPlayer1Turn,
  incrementShipHits,
  incrementScore,
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
      // increase player points
      dispatch(incrementScore('player1'));
    } else {
      dispatch(setMiss(dispatchData));
    }
  };

  return (
    <div className={`grid-container ${player1Turn ? 'player1' : 'player2'}`}>
      <div className='grid'>
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
