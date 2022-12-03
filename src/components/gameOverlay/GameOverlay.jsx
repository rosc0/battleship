import { useSelector, useDispatch } from 'react-redux';
import {
  startGame,
  selectGameWon,
  resetScores,
  selectGameStarted,
} from '../../store/gameSlice';
import { setGrid, setShips } from '../../store/gridSlice';

import './GameOverlay.styles.scss';

const GameOverlay = () => {
  const dispatch = useDispatch();
  const gameStarted = useSelector(selectGameStarted);
  const gameWon = useSelector(selectGameWon);

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleRestartGame = () => {
    dispatch(setGrid({
      player: 'player1',
    })); // set player1 - they are the user
    dispatch(setShips({
      player: 'player2',
    })); // set player2 - they are the enemy
    dispatch(resetScores());
    dispatch(startGame());
  };

  return (
    <>
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
    </>
  );
};
export default GameOverlay;
