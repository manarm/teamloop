import { useState } from 'react';
import styles from './AddItem.module.scss'
import Button from '../common/Button'

export default function AddThoughtForm({onAdd, closeForm}) {
  const [title, setTitle] = useState('');

  const handleAddClick = () => {
    if(title.length === 0) {
      return;
    }
    onAdd(title);
    setTitle('');
    closeForm();
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }  
  }

  return(
  <div>
    <div>
      <label htmlFor="taskname">Thought Title</label>
      <input 
        id="taskname" 
        type='text' 
        value={title} 
        onKeyPress={handleKeyPress} 
        onChange={e => setTitle(e.target.value)} 
      />
    </div>
    <div className={styles.submitControls}>
      <Button onClick={() => closeForm()}>Cancel</Button>
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  </div>)
}