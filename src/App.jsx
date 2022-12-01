import Scores from './components/scores/Scores';
import Ship from './components/ship/Ship';
import Grid from './components/grid/Grid';

import { shipData } from './assets/data/shipData';

import './App.scss';

// TODO: replace with redux data
const ships = [];
for (const ship in shipData.shipTypes) {
  ships.push(ship)
}

function App() {
  return (
    <div className='app-container'>
      <div className='game-info-container'>
        <div className='player-score-container'>
          <Scores />
        </div>
        <div className='ship-info-container'>  
          {
            ships.map((ship) => {
              return <Ship key={ship} ship={ship} />
            })
          }      
        </div>
      </div>
      <div className='game-grid-container'>
        <Grid />
      </div>
    </div>
  )
}

export default App;
