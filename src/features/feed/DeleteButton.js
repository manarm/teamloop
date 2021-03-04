import {useState} from 'react';
import Modal from 'react-modal';
import Button from '../common/Button';
import styles from './DeleteButton.module.scss';

export default function DeleteButton({item, deleteItem, children}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeleteClick = () => {
    setModalIsOpen(false);
    deleteItem(item.id);
  }

  return <>
    <Modal className={styles.modal} overlayClassName={styles.overlay}  isOpen={modalIsOpen}>
      <div className={styles.header}>
        <Button onClick={() => setModalIsOpen(false)}>X</Button>
      </div>
      <div className={styles.content}>
        <p><strong>WARNING</strong></p>
        <p>This will delete this loop for all users.</p>
        <p>No takebacks.</p>
      </div>
      <div className={styles.controls}>
        <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </div>
    </Modal>
    <Button onClick={() => setModalIsOpen(true)}>{children}</Button>
    </>;
}
