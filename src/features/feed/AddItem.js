import { useState } from 'react';
import styles from './AddItem.module.scss';
import Modal from 'react-modal';
import Button from '../common/Button';
import ItemForm from './AddItemForm';

export default function AddItem({currentUser, users, addItem}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // For a11y.
  Modal.setAppElement('#root');

  const handleOpenModal = () => {
    setModalIsOpen(true);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  return (
  <>
  <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={modalIsOpen}>
    <div className={styles.header}>
      <h1>New Loop</h1>
      <Button onClick={handleCloseModal}>X</Button>
    </div>
    <ItemForm addItem={addItem} currentUser={currentUser} users={users} closeForm={handleCloseModal}/>
  </Modal>
  <div className={styles.addItem}>
    <Button onClick={handleOpenModal}>+ compose</Button>
  </div>
  </>
  );
}
