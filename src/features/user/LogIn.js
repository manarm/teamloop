import { connect } from 'react-redux';
import { useState } from 'react';
import { login } from './userSlice';
import styles from './LogIn.module.scss';
import Button from '../common/Button';
import UserSelector from '../common/UserSelector';
import DemoHacks from './DemoHacks';

function Login({login, users}) {
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
      <div className={styles.controls}>
        <DemoHacks />
        <div>
          <UserSelector name='us' value={user} onChange={handleChangeUser} users={users}>
            Select User 
          </UserSelector>
        </div>
        <Button onClick={handleLoginClick}>Log In</Button>
      </div>
    </div>
    </div>);
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  }
}
const actionCreators = {login};
export default connect(mapStateToProps, actionCreators)(Login);