import { useState } from 'react';
import styles from './AddItemForm.module.scss';
import Button from '../common/Button'
import UserSelector from '../common/UserSelector';


export default function AddTaskForm({addItem, currentUser, users, closeForm}) {
  const [itemType, setItemType] = useState('task');
  const [title, setTitle] = useState('');
  const [assignTo, setAssignTo] = useState(currentUser);

  const handleAddClick = () => {
    if(title.length === 0) {
      return;
    }
    addItem(itemType.toUpperCase(), title, currentUser, assignTo);
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
    <div className={styles.formFields}>
      <label htmlFor="itemType">Type</label>
      <select name="itemType" id="itemType" value={itemType} onChange={e => setItemType(e.target.value)}>
        <option value="task">Task</option>
        <option value="thought">Thought</option>
        <option value="question">Question</option>
      </select>
      <UserSelector name="us" value={assignTo} onChange={handleUserChange} users={users} > 
        To
      </UserSelector>
      <label htmlFor="taskname">Task Title</label>
      <input 
        id="taskname" 
        type='text' 
        value={title} 
        onKeyPress={handleKeyPress} 
        onChange={e => setTitle(e.target.value)} 
      />
      <Button onClick={() => closeForm()}>Cancel</Button>
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  )
}