import { useState } from 'react';
import styles from './AddItem.module.scss'
import Button from '../common/Button'
import UserSelector from '../common/UserSelector';


export default function AddTaskForm({onAdd, currentUser, users, closeForm}) {
  const [title, setTitle] = useState('');
  const [assignTo, setAssignTo] = useState(currentUser);

  const handleAddClick = () => {
    if(title.length === 0) {
      return;
    }
    onAdd(title, currentUser, assignTo);
    setTitle('');
    closeForm();
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }  
  }

  const handleUserChange = (e) => {
    setAssignTo(e.target.value);
  }


  return(
  <div>
    <UserSelector name="us" value={assignTo} onChange={handleUserChange} users={users} > 
      Assign To:
    </UserSelector>
    <label htmlFor="taskname">Task Title</label>
    <input 
      id="taskname" 
      type='text' 
      value={title} 
      onKeyPress={handleKeyPress} 
      onChange={e => setTitle(e.target.value)} 
    />
    <div className={styles.submitControls}>
      <Button onClick={() => closeForm()}>Cancel</Button>
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  </div>)
}