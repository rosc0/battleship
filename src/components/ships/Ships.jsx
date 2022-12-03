import { useSelector } from 'react-redux';
import { selectShips } from '../../store/gameSlice';

import Ship from '../ship/Ship';

import './Ships.styles.scss';

const Ships = () => {
  const ships = useSelector(selectShips);

  return (
    <div className='ship-info-container'>
      {ships.map((ship) => {
        return <Ship key={ship.id} ship={ship} />;
      })}
    </div>
  );
};
export default Ships;
