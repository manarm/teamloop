import styles from './Header.module.scss';
import Button from './Button';

export default function Header() {
  return (
  <div className={styles.header}>
    <h1>TEAMLOOP🗘</h1>
    <div>
      <span>user</span>
      <Button>logout</Button>
    </div>
  </div>
)}