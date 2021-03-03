import styles from './Header.module.scss';
import Button from './Button';

export default function Header({currentUser, onLogout}) {
  return (
  <div className={styles.header}>
    <h1>TEAMLOOP🗘</h1>
    <div className={styles.userControls}>
      <span>{currentUser}</span>
      <Button onClick={onLogout}>logout</Button>
    </div>
  </div>
)}