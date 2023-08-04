import { useState } from 'react';
import Card from '../Card/Card';
import { AnimatePresence, motion } from 'framer-motion';

import globalStyles from '../../styles/globals';

const shuffleCards = (cards) => {
  return cards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const CardShuffler = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledArray, setShuffledArray] = useState(shuffleCards(cards));

  console.log(shuffledArray);

  const restart = () => {
    setCurrentIndex(0);
    setShuffledArray(shuffleCards(cards));
  };

  return (
    <div className='flex flex-col items-center justify-center border border-dashed'>
      <div className='text-center'>
        <Card
          key={shuffledArray[currentIndex].title}
          card={shuffledArray[currentIndex]}
        />
        {currentIndex + 1}/{shuffledArray.length}
      </div>
      <div>
        <button
          className={globalStyles.button}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex === shuffledArray.length - 1}
        >
          Next
        </button>
        <button className={globalStyles.button} onClick={restart}>
          Restart
        </button>
        CrurentIdx:{currentIndex}
      </div>
    </div>
  );
};

export default CardShuffler;
