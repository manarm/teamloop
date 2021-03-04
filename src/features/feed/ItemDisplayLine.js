import styles from './ItemDisplayLine.module.scss'
import { useState } from 'react';
import { getNextStatus } from './feedSlice';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ItemDisplayLine({item, currentUser, setItemStatus, deleteItem, answerQuestion, onExpand}) {
  const [questionState, setQuestionState] = useState(null);
  const next = getNextStatus(item);

  const isQuestion = item.item_type === 'QUESTION';
  const isAssignedToMe = item.assigned_to === currentUser;
  const questionButtons = (
  <span onChange={e => setQuestionState(e.target.value)}>
    <input type="radio" id="yes" name="question" value="yes" />
    <label htmlFor="yes">Yes</label>
    <input type="radio" id="no" name="question" value="no" />
    <label htmlFor="no">No</label>
  </span>);
  const displayQuestion = isQuestion && isAssignedToMe && item.status === 'NEW';

  const questionAnswer = <>
    Answer: {item.answerIsYes ? 'yes' : 'no'}
  </>
  const displayAnswer = isQuestion && item.status === 'COMPLETE';

  const handleNextClick = () => {
    if(displayQuestion) {
      if (questionState !== null) {
        const answerIsYes = questionState === 'yes';
        answerQuestion(item.id, answerIsYes);
        setItemStatus(item.id, next.nextStatus);     
      }
    } else {
      setItemStatus(item.id, next.nextStatus);
    }
  }

  const displayNextControl = next !== null && isAssignedToMe;

  const displayTitle = item.title.length > 30 ?
    item.title.substring(0,30) + '...' :
    item.title;

  return (
  <div className={styles.wrapper}>
  <button onClick={onExpand} className={styles.titleButton}>
    <Badge type={item.item_type} />
    <span className={styles.title}>
      {displayTitle}
    </span>
  </button>
  <span>
    <div>{`by: ${item.author}`}</div>
    <div>{`to: ${item.assigned_to}`}</div>
  </span>
  <span>
    { displayQuestion && questionButtons }
    { displayAnswer && questionAnswer }
  </span>
  <span className={styles.controls}>
    <Button onClick={onExpand}>Expand</Button>
    {displayNextControl && (
      <Button onClick={handleNextClick}>{next.verb}</Button>
    )}
  </span>
  </div>
  );
}