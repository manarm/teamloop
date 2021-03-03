import { useState } from 'react';
import styles from './LogIn.module.scss';
import Button from '../common/Button'
import UserSelector from '../common/UserSelector'

export default function Login({login, users}) {
  const [ user, setUser ] = useState(users[0].name);

  const handleChangeUser = e => {
    setUser(e.target.value);
  }

  const handleLoginClick = () => {
    login(user);
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>  
        <div className={styles.logo}>TEAMLOOP🗘</div>
        <p className={styles.warning}>DEMO MODE</p>
        <UserSelector name='us' value={user} onChange={handleChangeUser} users={users}>
          Select User: 
        </UserSelector>
        <Button onClick={handleLoginClick}>Log In</Button>
      </div>
    </div>);
}