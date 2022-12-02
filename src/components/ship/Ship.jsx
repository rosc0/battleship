import hitSmallImg from '../../assets/img/hit-sm.png';
import missSmallImg from '../../assets/img/miss-sm.png';

import './Ship.styles.scss';

const Ship = ({ ship }) => {
  const img = require(`../../assets/img/ships/${ship.name}.png`);

  return (
    <div className='ship-info'>
      <div className='ship'>
        <img src={img} border='0' alt={ship.name} />
      </div>
      <div className='hits'>
        {Array.from(Array(ship.size), (e, i) => {
          // (i + 1) to offset index to show hits
          if (ship.hits >= i + 1) {
            return (
              <img
                key={`hit-miss-${i}`}
                src={hitSmallImg}
                border='0'
                alt='Hit'
              />
            );
          } else {
            return (
              <img
                key={`hit-miss-${i}`}
                src={missSmallImg}
                border='0'
                alt='Miss'
              />
            );
          }
        })}
      </div>
    </div>
  );
};
export default Ship;
