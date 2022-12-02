import { useSelector, useDispatch } from 'react-redux';
import {
  startGame,
  selectGameStarted,
  selectShips,
  incrementScore,
  togglePlayersTurn,
} from './store/gameSlice';

import Scores from './components/scores/Scores';
import Ship from './components/ship/Ship';
import Grid from './components/grid/Grid';

import './App.scss';

function App() {
  const gameStarted = useSelector(selectGameStarted);
  const ships = useSelector(selectShips);
  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(startGame());
  }

  return (
    <div className='app-container'>
      <div className='game-info-container'>
        <div className='player-score-container'>
          <Scores />
        </div>
        <div className='ship-info-container'>  
          {
            ships.map((ship) => {
              return <Ship key={ship.name} ship={ship} />
            })
          } 


          {/* testing area */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <button onClick={() => dispatch(incrementScore('player1'))}>Increment P1</button>   
          <button onClick={() => dispatch(incrementScore('player2'))}>Increment P2</button>   
          <button onClick={() => dispatch(togglePlayersTurn())}>Toggle turn</button>   
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* testing area */}


        </div>
      </div>
      <div className='game-grid-container'>
        { !gameStarted && (
          <div className='start-game-overlay'>
            <div>Welcome to Battleship!</div>
            <button onClick={() => handleStartGame()}>START</button>
          </div>
        )}
        <Grid />
      </div>
    </div>
  )
}

export default App;
