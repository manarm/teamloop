import styles from './ItemDisplay.module.scss'
import { useState } from 'react';
import { getNextStatus } from './feedSlice';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ItemDisplay ({item, setItemStatus, deleteItem, answerQuestion}) {
  const [questionState, setQuestionState] = useState(null);
  const next = getNextStatus(item);

  const getBadge = () => {
    switch(item.item_type) {
      case 'TASK':
        return <Badge.Task />
      case 'THOUGHT':
        return <Badge.Thought />
      case 'QUESTION':
        return <Badge.Question />
      default:
        return null;
    }
  }

  const isQuestion = item.item_type === 'QUESTION';
  const questionButtons = (
  <span onChange={e => setQuestionState(e.target.value)}>
    <input type="radio" id="yes" name="question" value="yes" />
    <label htmlFor="yes">Yes</label>
    <input type="radio" id="no" name="question" value="no" />
    <label htmlFor="no">No</label>
  </span>);
  const displayButtons = isQuestion && item.status === 'NEW';

  const questionAnswer = <>
    Answer: {item.answerIsYes ? 'yes' : 'no'}
  </>
  const displayAnswer = isQuestion && item.status === 'COMPLETE';

  const handleNextClick = () => {
    if(displayButtons) {
      if (questionState !== null) {
        const answerIsYes = questionState === 'yes';
        answerQuestion(item.id, answerIsYes);
        setItemStatus(item.id, next.nextStatus);     
      }
    } else {
      setItemStatus(item.id, next.nextStatus);
    }
  }

  return (
  <div className={styles.wrapper}>
  {getBadge()}
  <span className={styles.title}>
    {item.title}
  </span>
  <span>
    <div>{`by: ${item.author}`}</div>
    <div>{`to: ${item.assigned_to}`}</div>
  </span>
  <span>
    { displayButtons && questionButtons }
    { displayAnswer && questionAnswer }
  </span>
  <span className={styles.controls}>
    {next !== null && (
      <Button onClick={handleNextClick}>{next.verb}</Button>
    )}
    <Button onClick={() => deleteItem(item.id)}>x</Button>
  </span>
  </div>
  );
}