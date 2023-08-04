import Card from '../Card/Card';
import { IoCreate, IoTrash } from 'react-icons/io5';

const CardList = ({ cards }) => {
  return (
    <ul className='flex items-center justify-center flex-wrap gap-2'>
      {cards.map((card) => (
        <div
          key={card.title}
          className='flex flex-col gap-2 border border-dashed p-2'
        >
          <Card card={card} />
          <CardActions card={card} />
        </div>
      ))}
    </ul>
  );
};

const CardActions = ({ card }) => {
  return (
    <div className='flex items-center justify-around p-2'>
      <button className='flex items-center gap-2 rounded-md p-1 bg-neutral-700'>
        <span>Edit</span>
        <IoCreate className='' />
      </button>
      <button className='flex items-center gap-2 rounded-md p-1 bg-neutral-700'>
        <span>Delete</span>
        <IoTrash />
      </button>
    </div>
  );
};

export default CardList;
