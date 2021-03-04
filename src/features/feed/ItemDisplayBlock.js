import { useState } from 'react';
import styles from './ItemDisplayBlock.module.scss';
import Badge from '../common/Badge'
import Button from '../common/Button';
import AdvanceItemButton from './AdvanceItemButton';
import DeleteButton from './DeleteButton';
import QuestionDisplay from './QuestionDisplay';

export default function ItemDisplayBlock({item, setItemStatus, deleteItem, currentUser, answerQuestion, onClose}) {
  const [answer, setAnswer] = useState(null);

  const content = () => {
    switch (item.item_type) {
      case 'TASK':
      case 'THOUGHT':
        return item.description;
      case 'QUESTION':
        return <QuestionDisplay 
          item={item} 
          currentUser={currentUser}
          answer={answer}
          setAnswer={setAnswer}
        />
      default:
        return null;
    }
  }

  const verifyAndAnswer = () => {
    if(item.item_type === 'QUESTION') {
      if (answer !== null) {
        answerQuestion(item.id, answer);
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  
  return <div className={styles.block}>
    <div className={styles.badge}><Badge type={item.item_type} /></div>
    <div className={styles.title}><h3>{item.title}</h3></div>
    <div className={styles.close}><Button onClick={onClose}>Close</Button></div>
    <div className={styles.meta}><ul>
      <li>type: {item.item_type.toLowerCase()}</li>
      <li>from: {item.author}</li>  
      <li>to: {item.assigned_to}</li>  
      <li>status: {item.status.toLowerCase().replace('_', ' ')}</li>  
    </ul></div>
    <div className={styles.content}>{content()}</div>
    <div className={styles.controls}>
      <AdvanceItemButton item={item} verifyAndAnswer={verifyAndAnswer} setItemStatus={setItemStatus} currentUser={currentUser}/>
      <DeleteButton item={item} deleteItem={deleteItem}>Delete</DeleteButton>
    </div>
  </div>;
}