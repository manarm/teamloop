import { useState } from 'react';
import styles from './AddItem.module.scss';
import Modal from 'react-modal';
import Button from '../common/Button';
import TaskForm from './AddTaskForm';

export default function AddItem({addTask, addThought}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // For a11y.
  Modal.setAppElement('#root');

  const handleAddThought = () => addThought('yo');

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  return (
  <>
  <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={modalIsOpen}>
    <div className={styles.header}>
      <h1>Add New Item</h1>
      <Button onClick={handleCloseModal}>X</Button>
    </div>

    <div className={styles.formFields}>
      <div>
        <label htmlFor="itemType">Type</label>
        <select name="itemType" id="itemType">
          <option value="task">Task</option>
        </select>
      </div>
      <TaskForm onAdd={addTask} closeForm={handleCloseModal}/>
    </div>
  </Modal>
  <div className={styles.addItem}>
    <Button onClick={() => setModalIsOpen(true)}>Add Item</Button>
    <Button onClick={handleAddThought}>Add Thought</Button>
  </div>
  </>
  );
}
