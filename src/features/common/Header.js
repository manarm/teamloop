import styles from './Header.module.scss';
import Button from './Button';

export default function Header({currentUser, logout}) {
  const handleLogoutClick = () => {
    console.log('logout');
    logout();
  }

  return (
  <div className={styles.header}>
    <h1>TEAMLOOP🗘</h1>
    <div className={styles.userControls}>
      <span>{currentUser}</span>
      <Button onClick={handleLogoutClick}>logout</Button>
    </div>
  </div>
)}