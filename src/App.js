import Scores from './components/scores/Scores';

import './App.scss';

function App() {
  return (
    <div className='app-container'>
      <div className='game-info-container'>
        <div className='player-score-container'>
          <Scores />
        </div>
        <div className='ship-info-container'>        
          Ships
        </div>
      </div>
      <div className='game-grid-container'>
        Grid
      </div>
    </div>
  )
}

export default App;
