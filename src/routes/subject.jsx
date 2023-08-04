import { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import { Link, useParams } from 'react-router-dom';

import globalStyles from '../styles/globals';
import SubjectList from '../components/SubjectList/SubjectList';

const Subject = () => {
  let { subjectName } = useParams();
  let { data, setData } = useContext(AppContext);
  const [newTopic, setNewTopic] = useState('');

  let currentSubject = data.filter(
    (subject) => subject.subject === subjectName
  )[0];

  const addTopic = (e) => {
    e.preventDefault();

    let topicToAdd = { topic: newTopic, decks: [] };
    let updatedTopics = [...currentSubject.topics, topicToAdd];
    let updatedSubject = { ...currentSubject, topics: updatedTopics };
    let updatedSubjects = data.map((subject) =>
      subject.subject === subjectName ? updatedSubject : subject
    );

    setData(updatedSubjects);
    setNewTopic('');
  };

  return (
    <div className={`${globalStyles.container} gap-4`}>
      <p>Subject: {subjectName}</p>
      <h3 className={`${globalStyles.mdHeading}`}>Topics:</h3>
      <ul className='flex flex-col'>
        {currentSubject.topics.length > 0 ? (
          currentSubject.topics.map((topic, i) => (
            <Link to={`/${subjectName}/${topic.topic}`} key={i}>
              {topic.topic}
            </Link>
          ))
        ) : (
          <p>No topics yet</p>
        )}
      </ul>
      <form onSubmit={addTopic} className={globalStyles.addForm}>
        <input
          className={globalStyles.inputField}
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button className={globalStyles.button}>Add</button>
      </form>

      <SubjectList type='topic' />
    </div>
  );
};

export default Subject;
