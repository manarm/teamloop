import { useState } from 'react';
import styles from './AddItem.module.scss';
import Button from '../common/Button';

export default function AddItem({addTask}) {
  const [taskField, setTaskField] = useState('');

  const handleAddClick = () => {
    if(taskField.length === 0) {
      return;
    }
    addTask(taskField);
    setTaskField('');
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }  
  }

  return (
  <div className={styles.addTask}>
    <input type='text' value={taskField} onKeyPress={handleKeyPress} onChange={e => setTaskField(e.target.value)} />
    <Button onClick={handleAddClick}>Add</Button>
  </div>
  );
}