import './Scores.styles.scss';

const Scores = () => {
  return (
    <div className='player-scores'>
      <div className='player player1'>
        <span className='count'>00</span>
        <div className='player-name'>Player 1</div>
      </div>
      <div className='player player2'>
        <span className='count'>00</span>
        <div className='player-name'>Player 2</div>
      </div>
    </div>
  );
};
export default Scores;
