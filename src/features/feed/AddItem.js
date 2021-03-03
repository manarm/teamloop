import { useState } from 'react';
import styles from './AddItem.module.scss';
import Modal from 'react-modal';
import Button from '../common/Button';
import TaskForm from './AddTaskForm';
import ThoughtForm from './AddThoughtForm';
import QuestionForm from './AddQuestionForm';

export default function AddItem({currentUser, users, addTask, addThought, addQuestion}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemType, setItemType] = useState('task');

  // For a11y.
  Modal.setAppElement('#root');

  const handleOpenModal = () => {
    setItemType('task');
    setModalIsOpen(true);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  const getForm = () => {
    switch(itemType) {
      case 'task' :
        return <TaskForm onAdd={addTask} currentUser={currentUser} users={users} closeForm={handleCloseModal}/>;
      case 'thought':
        return <ThoughtForm onAdd={addThought} currentUser={currentUser} users={users} closeForm={handleCloseModal}/>;
      case 'question':
        return <QuestionForm onAdd={addQuestion} currentUser={currentUser} users={users} closeForm={handleCloseModal}/>;
      default:
        return null;
    }
  }

  return (
  <>
  <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={modalIsOpen}>
    <div className={styles.header}>
      <h1>Add New Item</h1>
      <Button onClick={handleCloseModal}>X</Button>
    </div>

    <div className={styles.formFields}>
      <div className={styles.formHeader}>
        <label htmlFor="itemType">Type</label>
        <select name="itemType" id="itemType" value={itemType} onChange={e => setItemType(e.target.value)}>
          <option value="task">Task</option>
          <option value="thought">Thought</option>
          <option value="question">Question</option>
        </select>
      </div>
      {getForm()}
    </div>
  </Modal>
  <div className={styles.addItem}>
    <Button onClick={handleOpenModal}>Add Item</Button>
  </div>
  </>
  );
}
