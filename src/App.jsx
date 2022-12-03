/*
//TODO: 
- score should be when a boat is sunk instead of each hit
- when gae is won, don't clear score until the user clicks restart
- think what to do with GRID_HEIGHT & GRID_WIDTH, grid could be configurable?
- cleanup player1 / player2, leave space for them but remove half done functionality
- general cleanup, could probably split a few things out to make it nicer
*/

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startGame,
  selectGameStarted,
  selectShips,
  selectGameWon,
} from './store/gameSlice';
import { setGrid, setShips } from './store/gridSlice';

import Scores from './components/scores/Scores';
import Ship from './components/ship/Ship';
import Grid from './components/grid/Grid';

import './App.scss';

function App() {
  const dispatch = useDispatch();

  const gameStarted = useSelector(selectGameStarted);
  const gameWon = useSelector(selectGameWon);
  const ships = useSelector(selectShips);

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleRestartGame = () => {
    dispatch(setGrid('player1')); // only player1 as they are the user
    dispatch(setShips('player2')); // only player2 as they are the enemy
    dispatch(startGame());
  };

  useEffect(() => {
    dispatch(setGrid('player1')); // only player1 as they are the user
    dispatch(setShips('player2')); // only player2 as they are the enemy
  }, [dispatch]);

  return (
    <div className='app-container'>
      <div className='game-info-container'>
        <div className='player-score-container'>
          <Scores />
        </div>
        <div className='ship-info-container'>
          {ships.map((ship) => {
            return <Ship key={ship.name} ship={ship} />;
          })}
        </div>
      </div>
      <div className='game-grid-container'>
        {!gameStarted && (
          <div className='start-game-overlay'>
            {gameWon ? (
              <>
                <div>Congratulations! You won!</div>
                <button onClick={() => handleRestartGame()}>PLAY AGAIN</button>
              </>
            ) : (
              <>
                <div>Welcome to Battleship!</div>
                <button onClick={() => handleStartGame()}>START</button>
              </>
            )}
          </div>
        )}
        <Grid />
      </div>
    </div>
  );
}

export default App;
