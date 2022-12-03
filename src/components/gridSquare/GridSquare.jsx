import hitLargeImg from '../../assets/img/hit-lg.png';
import missLargeImg from '../../assets/img/miss-lg.png';

import './GridSquare.styles.scss';

const GridSquare = ({ gridSquare, clickHandler }) => {
  const { hit, miss } = gridSquare;

  const handleClick = (gridSquare) => {
    if (!hit && !miss) {
      clickHandler(gridSquare);
    }
  };

  return (
    <div className='grid-square' onClick={() => handleClick(gridSquare)}>
      {hit && <img src={hitLargeImg} border='0' draggable='false' alt='Hit' />}
      {miss && (
        <img src={missLargeImg} border='0' draggable='false' alt='Miss' />
      )}
    </div>
  );
};
export default GridSquare;
