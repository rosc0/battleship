
import hitLargeImg from '../../assets/img/hit-lg.png';
import missLargeImg from '../../assets/img/miss-lg.png';

import './Grid.styles.scss';

// TODO: build this on game start and store in redux
const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;
const grid = [];
for (let i = 0; i < GRID_HEIGHT; i++) {
  for (let j = 0; j < GRID_WIDTH; j++) {
    grid.push([i, j])
  }
}

const Grid = () => {
  return (
    <div className='grid-container player1'>
      <div className='grid'>
        {
          grid.map((square) => {
            console.log('square', square[0], square[1])
            return (
              <div className='grid-square'>
                {
                  //TODO: replace with real data
                  (
                    (square[0] === 0 && square[1]) === 7 ||
                    (square[0] === 1 && square[1]) === 7 ||
                    (square[0] === 2 && square[1]) === 7 ||
                    (square[0] === 3 && square[1]) === 7
                  ) && 
                  <img src={hitLargeImg} border='0' alt='Hit' />
                }

                {
                  //TODO: replace with real data
                  (
                    (square[0] === 4 && square[1]) === 8 ||
                    (square[0] === 3 && square[1]) === 2 ||
                    (square[0] === 7 && square[1]) === 4 ||
                    (square[0] === 9 && square[1]) === 9
                  ) && 
                  <img src={missLargeImg} border='0' alt='Miss' />
                }
                
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Grid