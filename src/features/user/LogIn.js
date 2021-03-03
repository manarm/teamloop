import styles from './LogIn.module.scss';
import Button from '../common/Button'

export default function Login({login}) {
  return <Button className={styles.login} onClick={login}>Log In</Button>
}