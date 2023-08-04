import { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import SubjectList from '../components/SubjectList/SubjectList';
import { Link } from 'react-router-dom';
import { defaultItem } from '../context/dummyData';

import globalStyles from '../styles/globals';
import Modal from '../components/Modal/Modal';

function Root() {
  const { data, setData } = useContext(AppContext);
  const [newSubject, setNewSubject] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const addSubject = (e) => {
    e.preventDefault();

    let subjectToAdd = { subject: newSubject, topics: [] };
    let updatedSubjects = [...data, subjectToAdd];

    setData(updatedSubjects);
    setNewSubject('');
  };

  const removeSubject = (subject) => {
    let updatedSubjects = data.filter((item) => item.subject !== subject);
    setData(updatedSubjects);
  };

  console.log('GLOBAL:', data);

  return (
    <div className={`${globalStyles.container} gap-4`}>
      <form
        className={`${globalStyles.addForm} border-b pb-4 w-1/2`}
        onSubmit={(e) => addSubject(e)}
      >
        <input
          className={globalStyles.inputField}
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button className={globalStyles.button}>Add</button>
      </form>

      <SubjectList type='subject' />

    </div>
  );
}

export default Root;
