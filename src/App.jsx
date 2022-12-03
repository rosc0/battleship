import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGrid, setShips } from './store/gridSlice';

import Scores from './components/scores/Scores';
import Ships from './components/ships/Ships';
import Grid from './components/grid/Grid';
import GameOverlay from './components/gameOverlay/GameOverlay';

import './App.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setGrid({
        player: 'player1',
      })
    ); // set player1 - they are the user
    dispatch(
      setShips({
        player: 'player2',
      })
    ); // set player2 - they are the enemy
  }, [dispatch]);

  return (
    <div className='app-container'>
      <div className='game-info-container'>
        <Scores />
        <Ships />
      </div>
      <div className='game-grid-container'>
        <GameOverlay />
        <Grid />
      </div>
    </div>
  );
}

export default App;
