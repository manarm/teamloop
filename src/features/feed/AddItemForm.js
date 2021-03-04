import { useState } from 'react';
import styles from './AddItemForm.module.scss';
import Button from '../common/Button'
import UserSelector from '../common/UserSelector';


export default function AddTaskForm({addItem, currentUser, users, closeForm}) {
  const [itemType, setItemType] = useState('Task');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignTo, setAssignTo] = useState(currentUser);

  const resetForm = () => {
    setTitle('');
    setItemType('Task');
  }

  const validateForm = () => {
    return title.length !== 0;
  }

  const handleCloseClick = () => {
    resetForm();
    closeForm();
  }

  const handleAddClick = () => {
    if(!validateForm()) {
      return;
    }
    addItem({
      item_type: itemType.toUpperCase(), 
      title, 
      author: currentUser, 
      assigned_to: assignTo,
      description
    });
    resetForm();
    closeForm();
  }

  const handleUserChange = (e) => {
    setAssignTo(e.target.value);
  }

  return(
    <div className={styles.formFields}>
      <label htmlFor="itemType">Type</label>
      <select name="itemType" id="itemType" value={itemType} onChange={e => setItemType(e.target.value)}>
        <option value="Task">Task</option>
        <option value="Thought">Thought</option>
        <option value="Question">Question</option>
      </select>
      <UserSelector name="us" value={assignTo} onChange={handleUserChange} users={users} > 
        To
      </UserSelector>
      <label htmlFor="title">{itemType} title</label>
      <input 
        id="title" 
        type='text' 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <label htmlFor="description">Description</label>
      <input 
        id="description" 
        type='text' 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <Button onClick={handleCloseClick}>Cancel</Button>
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  )
}