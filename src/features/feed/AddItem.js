import { useState } from 'react';
import styles from './AddItem.module.scss';
import Modal from 'react-modal';
import Button from '../common/Button';

export default function AddItem({addTask, addThought}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskField, setTaskField] = useState('');

  // TODO -- pull into modal, make customizable.
  const handleAddThought = () => {
    addThought('BRAND NU THINK');
  }

  const handleAddClick = () => {
    if(taskField.length === 0) {
      return;
    }
    addTask(taskField);
    setTaskField('');
    setModalIsOpen(false);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setTaskField('');
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }  
  }

  // For a11y.
  Modal.setAppElement('#root');

  return (
  <>
  <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={modalIsOpen}>
    <div className={styles.header}>
      <h1>Add New Item</h1>
      <Button onClick={handleCloseModal}>X</Button>
    </div>
    <div className={styles.formFields}>
      <label htmlFor="taskname">Task</label>
      <input id="taskname" type='text' value={taskField} onKeyPress={handleKeyPress} onChange={e => setTaskField(e.target.value)} />
    </div>
    <div className={styles.submitControls}>
      <Button onClick={handleCloseModal}>Cancel</Button>
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  </Modal>
  <div className={styles.addItem}>
    <Button onClick={() => setModalIsOpen(true)}>Add Item</Button>
    <Button onClick={handleAddThought}>Add Thought</Button>
  </div>
  </>
  );
}
