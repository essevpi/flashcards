import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoTrash, IoCreate } from 'react-icons/io5';
import ContextualMenu from '../ContextualMenu/ContextualMenu';

import styles from './Card.styles';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={styles.container}
      onClick={() => setIsFlipped((prev) => !prev)}
    >      
      <div
        className={styles.wrapper}
        style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }}
      >
        <div className={`${styles.inner}`}>
          <h3 className={styles.title}>{card.title}</h3>
        </div>
        <div
          className={`${styles.inner} [transform:rotateY(180deg)]`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <ul>
            {card.keywords.map((keyword) => (
              <li key={keyword} className={styles.keywords}>
                {keyword}
              </li>
            ))}
          </ul>
        </div>        
      </div>
    </motion.div>
  );
};

export default Card;
