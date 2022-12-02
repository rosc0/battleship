import { useSelector } from 'react-redux';
import {
  selectPlayer1Score,
  selectPlayer2Score,
} from '../../store/gameSlice';
import './Scores.styles.scss';

const Scores = () => {
  const player1Score = useSelector(selectPlayer1Score);
  const player2Score = useSelector(selectPlayer2Score);

  const padScore = (number) => {
    return number.toString().padStart(2, '0');
  }

  return (
    <div className='player-scores'>
      <div className='player player1'>
        <span className='score'>{ padScore(player1Score) }</span>
        <div className='player-name'>Player 1</div>
      </div>
      <div className='player player2'>
        <span className='score'>{ padScore(player2Score) }</span>
        <div className='player-name'>Player 2</div>
      </div>
    </div>
  );
};
export default Scores;
