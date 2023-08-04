import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../context/context';

import globalStyles from '../styles/globals';
import Card from '../components/Card/Card';
import CardList from '../components/CardList/CardList';
import CardShuffler from '../components/CardShuffler/CardShuffler';

const Deck = () => {
  const { data, setData } = useContext(AppContext);
  const { subjectName, topicName, deckName } = useParams();
  const [formData, setFormData] = useState({ title: '', keyword: '' });
  const [newCard, setNewCard] = useState({ title: '', keywords: [] });
  const [hasStarted, setHasStarted] = useState(false);

  let currentSubject = data.filter(
    (subject) => subject.subject === subjectName
  )[0];

  let currentTopic = currentSubject.topics.filter(
    (topic) => topic.topic === topicName
  )[0];

  let currentDeck = currentTopic.decks.filter(
    (deck) => deck.deck === deckName
  )[0];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addKeyword = () => {
    setNewCard((prevCard) => ({
      ...prevCard,
      keywords: [...prevCard.keywords, formData.keyword],
    }));
    setFormData({ ...formData, keyword: '' });
  };

  const addCard = (e) => {
    e.preventDefault();

    let cardToAdd = { ...newCard, title: formData.title };
    let updatedDeck = [...currentDeck.cards, cardToAdd];
    let updatedDecks = currentTopic.decks.map((deck) =>
      deck.deck === deckName ? { ...deck, cards: updatedDeck } : deck
    );
    let updatedTopic = { ...currentTopic, decks: updatedDecks };
    let updatedTopics = currentSubject.topics.map((topic) =>
      topic.topic === topicName ? updatedTopic : topic
    );
    let updatedSubject = { ...currentSubject, topics: updatedTopics };
    let updatedSubjects = data.map((subject) =>
      subject.subject === subjectName ? updatedSubject : subject
    );

    setData(updatedSubjects);

    setNewCard({ title: '', keywords: [] });
    setFormData({ title: '', keyword: '' });
  };

  return (
    <div className={`${globalStyles.container} gap-4`}>
      {hasStarted ? (
        <div>
          <CardShuffler cards={currentDeck.deck} />
          <button
            className={globalStyles.button}
            onClick={() => setHasStarted(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <div id='manager'>
          {/* <div>
            <ul className='flex items-center justify-center flex-wrap gap-2'>
              {currentDeck.cards.map((card) => (
                <Card key={card.title} card={card} />
              ))}
            </ul>
          </div> */}
          <CardList cards={currentDeck.cards} onDelete={()=>{}} onEdit={()=>{}}/>
          <form
            className={`${globalStyles.addCardForm} border border-dashed rounded-lg p-2`}
            onSubmit={(e) => addCard(e)}
          >
            <input
              className={`${globalStyles.inputField}`}
              name='title'
              placeholder='title'
              value={formData.title}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='flex gap-2'>
              <input
                className={`${globalStyles.inputField}`}
                name='keyword'
                placeholder='keyword'
                value={formData.keyword}
                onChange={(e) => handleFormChange(e)}
              />
              <button
                className={`${globalStyles.button} px-4 text-lg`}
                type='button'
                onClick={addKeyword}
              >
                +
              </button>
            </div>
            <button className={`${globalStyles.button}`} type='submit'>
              Add Card
            </button>
          </form>
          <button
            className={globalStyles.button}
            onClick={() => setHasStarted(true)}
          >
            START
          </button>
        </div>
      )}

      {/* <div className='flex flex-col bg-violet-600 p-8 rounded-lg'>
        <h4>card preview</h4>
        <h3>Title:{newCard.title}</h3>
        <ul>
          KW:
          {newCard.keywords.map((keyword, i) => (
            <li key={i}>
              KW:{i} is: {keyword}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Deck;
