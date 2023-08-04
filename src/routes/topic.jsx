import { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import { Link, useParams } from 'react-router-dom';
import SubjectList from '../components/SubjectList/SubjectList';

import globalStyles from '../styles/globals';

const Topic = () => {
  let { subjectName, topicName } = useParams();
  let { data, setData } = useContext(AppContext);
  const [newDeck, setNewDeck] = useState('');

  let currentSubject = data.filter(
    (subject) => subject.subject === subjectName
  )[0];

  let currentTopic = currentSubject.topics.filter(
    (topic) => topic.topic === topicName
  )[0];

  const addDeck = (e) => {
    e.preventDefault();

    let deckToAdd = { deck: newDeck, cards: [] };
    let updatedDecks = [...currentTopic.decks, deckToAdd];
    let updatedTopic = { ...currentTopic, decks: updatedDecks };
    let updatedTopics = currentSubject.topics.map((topic) =>
      topic.topic === topicName ? updatedTopic : topic
    );
    let updatedSubject = { ...currentSubject, topics: updatedTopics };
    let updatedSubjects = data.map((subject) =>
      subject.subject === subjectName ? updatedSubject : subject
    );

    setData(updatedSubjects);
    setNewDeck('');
  };

  return (
    <div className={`${globalStyles.container} gap-4`}>
      <div>
        <p>{subjectName}</p>
        <p>{topicName}</p>
      </div>
        <h3 className={globalStyles.mdHeading}>Decks</h3>
        {/* <ul>
          {currentTopic.decks.map((deck, i) => (
            <Link key={i} to={`/${subjectName}/${topicName}/${deck.name}`}>
              {deck.name}
            </Link>
          ))}
        </ul> */}
        <SubjectList type='deck' />
      <form className={globalStyles.addForm} onSubmit={addDeck}>
        <input
          className={globalStyles.inputField}
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
        />
        <button className={globalStyles.button}>Add</button>
      </form>
    </div>
  );
};

export default Topic;
