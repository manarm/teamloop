import { useState } from 'react';
import styles from './AddItem.module.scss';
import Modal from 'react-modal';
import Button from '../common/Button';
import TaskForm from './AddTaskForm';
import ThoughtForm from './AddThoughtForm';

export default function AddItem({addTask, addThought}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemType, setItemType] = useState('task');

  // For a11y.
  Modal.setAppElement('#root');

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  const getForm = () => {
    switch(itemType) {
      case 'task' :
        return <TaskForm onAdd={addTask} closeForm={handleCloseModal}/>;
      case 'thought':
        return <ThoughtForm onAdd={addThought} closeForm={handleCloseModal}/>;
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
        </select>
      </div>
      {getForm()}
    </div>
  </Modal>
  <div className={styles.addItem}>
    <Button onClick={() => setModalIsOpen(true)}>Add Item</Button>
  </div>
  </>
  );
}
