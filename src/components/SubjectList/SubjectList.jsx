import { useState, useContext } from 'react';
import { AppContext } from '../../context/context';
import { Link, useParams } from 'react-router-dom';
import ContextualMenu from '../ContextualMenu/ContextualMenu';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';
import Confirmation from '../Confirmation/Confirmation';
import { IoTrash, IoCreate, IoSettings } from 'react-icons/io5';

import styles from './SubjectList.styles';

const SubjectList = ({ type }) => {
  const { data, setData } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { subjectName, topicName } = useParams();

  let selectedData;
  let basePath;

  switch (type) {
    case 'subject':
      selectedData = data;
      basePath = '';
      break;
    case 'topic':
      selectedData = data.filter(
        (subject) => subject.subject === subjectName
      )[0].topics;
      basePath = `/${subjectName}`;
      break;
    case 'deck':
      selectedData = data
        .filter((subject) => subject.subject === subjectName)[0]
        .topics.filter((topic) => topic.topic === topicName)[0].decks;
      basePath = `/${subjectName}/${topicName}`;
      break;
    default:
      selectedData = data;
  }

  const handleContextualMenu = (elem) => {
    isMenuOpen !== undefined ? setIsMenuOpen(undefined) : setIsMenuOpen(elem);
  };

  const handleMenuAction = (elem, action) => {
    setIsMenuOpen(undefined);
    setIsModalOpen(true);
    setModalData({ [type]: elem, action });
    setTitle(elem);
  };

  const handleEditForm = (e) => {
    e.preventDefault();

    if (data.some((subject) => subject[type] === title)) {
      alert(`${title} already exists`);
      return;
    }

    //edit element based on type
    switch (type) {
      case 'subject': {
        const newData = data.map((item) =>
          item.subject === modalData[type] ? { ...item, subject: title } : item
        );
        setData(newData);
        setIsModalOpen(false);
        break;
      }
      case 'topic': {
        const newTopics = data
          .filter((item) => item.subject === subjectName)[0]
          .topics.map((topic) =>
            topic.topic === modalData[type] ? { ...topic, topic: title } : topic
          );
        const newSubject = {
          ...data.filter((item) => item.subject === subjectName)[0],
          topics: newTopics,
        };
        const newSubjects = data.map((item) =>
          item.subject === subjectName ? newSubject : item
        );
        setData(newSubjects);
        setIsModalOpen(false);
        break;
      }
      case 'deck': {
        const newDecks = data
          .filter((item) => item.subject === subjectName)[0]
          .topics.filter((topic) => topic.topic === topicName)[0]
          .decks.map((deck) =>
            deck.deck === modalData[type] ? { ...deck, deck: title } : deck
          );
        const newTopic = {
          ...data
            .filter((item) => item.subject === subjectName)[0]
            .topics.filter((topic) => topic.topic === topicName)[0],
          decks: newDecks,
        };
        const newTopics = data
          .filter((item) => item.subject === subjectName)[0]
          .topics.map((topic) =>
            topic.topic === topicName ? newTopic : topic
          );
        const newSubject = {
          ...data.filter((item) => item.subject === subjectName)[0],
          topics: newTopics,
        };
        const newSubjects = data.map((item) =>
          item.subject === subjectName ? newSubject : item
        );
        setData(newSubjects);
        setIsModalOpen(false);
        break;
      }
      default:
        break;
    }
  };

  const removeItem = (subject) => {
    /* const newData = data.filter((item) => item.subject !== subject);
    setData(newData);
    setIsModalOpen(false); */
    switch (type) {
      case 'subject': {
        const newData = data.filter((item) => item.subject !== subject);
        setData(newData);
        setIsModalOpen(false);
        break;
      }
      case 'topic': {
        const newTopics = data
          .filter((item) => item.subject === subjectName)[0]
          .topics.filter((topic) => topic.topic !== subject);
        const newSubject = {
          ...data.filter((item) => item.subject === subjectName)[0],
          topics: newTopics,
        };
        const newSubjects = data.map((item) =>
          item.subject === subjectName ? newSubject : item
        );
        setData(newSubjects);
        setIsModalOpen(false);
        break;
      }
      case 'deck': {
        const newDecks = data
          .filter((item) => item.subject === subjectName)[0]
          .topics.filter((topic) => topic.topic === topicName)[0]
          .decks.filter((deck) => deck.deck !== subject);
        const newTopic = {
          ...data
            .filter((item) => item.subject === subjectName)[0]
            .topics.filter((topic) => topic.topic === topicName)[0],
          decks: newDecks,
        };
        const newTopics = data
          .filter((item) => item.subject === subjectName)[0]
          .topics.map((topic) =>
            topic.topic === topicName ? newTopic : topic
          );
        const newSubject = {
          ...data.filter((item) => item.subject === subjectName)[0],
          topics: newTopics,
        };
        const newSubjects = data.map((item) =>
          item.subject === subjectName ? newSubject : item
        );
        setData(newSubjects);
        setIsModalOpen(false);
        break;
      }
      default:
        break;
    }
  };

  const getModalContent = (elem, action) => {
    switch (action) {
      case 'edit':
        return (
          <EditForm
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onSubmit={(e) => handleEditForm(e)}
          />
        );
      case 'delete':
        return (
          <Confirmation
            message={`Do you really want to delete this ${type}?`}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => removeItem(elem)}
          />
        );

      default:
        return <h2>Default</h2>;
    }
  };

  return (
    <ul className='flex flex-col items-center justify-center gap-4 w-full rounded-md p-8 bg-neutral-900'>
      {selectedData.map((elem) => (
        <li
          key={elem[type]}
          className='flex items-center justify-between text-start gap-4 w-1/2 mx-auto'
        >
          <Link to={`${basePath}/${elem[type]}`} className='text-xl font-bold'>
            &bull; {elem[type]}
          </Link>
          <ContextualMenu
            isOpen={isMenuOpen === elem[type]}
            icon={
              <IoSettings
                className='cursor-pointer'
                onClick={() => handleContextualMenu(elem[type])}
              />
            }
          >
            <ContextualMenu.Action
              className={styles.contextualMenuItem}
              action='Edit'
              icon={<IoCreate />}
              onClick={() => handleMenuAction(elem[type], 'edit')}
            />
            <ContextualMenu.Action
              className={styles.contextualMenuItem}
              action='Delete'
              icon={<IoTrash />}
              onClick={() => handleMenuAction(elem[type], 'delete')}
            />
          </ContextualMenu>
        </li>
      ))}
      {isModalOpen && (
        <Modal title='Edit Subject' closeModal={() => setIsModalOpen(false)}>
          {getModalContent(modalData[type], modalData.action)}
        </Modal>
      )}
    </ul>
  );
};

export default SubjectList;
