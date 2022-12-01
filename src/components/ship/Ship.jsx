import hitSmallImg from '../../assets/img/hit-sm.png';
import missSmallImg from '../../assets/img/miss-sm.png';

import { shipData } from '../../assets/data/shipData';

import './Ship.styles.scss';

// TODO: replace with redux data
const hits = 1;

const Ship = ({ ship }) => {

  const img = require(`../../assets/img/ships/${ship}.png`);

  return (
    <div className='ship-info'>
      <div className='ship'>
        <img src={img} border='0' alt={ship} />
      </div>
      <div className='hits'>
        {
          Array.from(Array(shipData.shipTypes[ship].size), (e, i) => {
            // (i + 1) to offset index to match actual count of hits
            if (hits >= (i + 1)) {
              return <img key={`hit-miss-${i}`} src={hitSmallImg} border='0' alt='Hit' />
            } else {
              return <img key={`hit-miss-${i}`} src={missSmallImg} border='0' alt='Miss' />
            }
          })
        }
      </div>
    </div>
  );
};
export default Ship;
