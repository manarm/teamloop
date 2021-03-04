import {useState} from 'react';
import styles from './Header.module.scss';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faDoorClosed, faUndoAlt } from '@fortawesome/free-solid-svg-icons'

export default function Header({currentUser, onLogout}) {
  const [open, setOpen] = useState(true);

  return (
  <div className={styles.header}>
    <h1><FontAwesomeIcon icon={faUndoAlt} />TEAMLOOP</h1>
    <div className={styles.userControls}>
      <div>hello, {currentUser}</div>
      <Button onClick={onLogout} 
      onMouseEnter={() => setOpen(false)}
      onMouseOut={() => setOpen(true)}
      onFocus={() => setOpen(false)} 
      onBlur={() => setOpen(true)}>
        {open ? 
        <FontAwesomeIcon icon={faDoorOpen} />
        : <FontAwesomeIcon icon={faDoorClosed} />
        }
        logout
      </Button>
    </div>
  </div>
)}