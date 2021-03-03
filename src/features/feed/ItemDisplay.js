//import styles from './ItemDisplay.module.scss'
import { useState } from 'react';
import { getNextStatus } from './feedSlice';
import Button from '../common/Button'

export default function ItemDisplay ({item, setItemStatus, deleteItem, answerQuestion}) {
  const [questionState, setQuestionState] = useState(null);
  const next = getNextStatus(item);

  const isQuestion = item.item_type === 'QUESTION';
  const questionButtons = <span onChange={e => setQuestionState(e.target.value)}>
    <input type="radio" id="yes" name="question" value="yes" />
    <label htmlFor="yes">Yes</label>
    <input type="radio" id="no" name="question" value="no" />
    <label htmlFor="no">No</label>
  </span>
  const displayButtons = isQuestion && item.status === 'NEW';

  const questionAnswer = <span>
    Answer: {item.answerIsYes ? 'yes' : 'no'}
  </span>
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
  <>
  <span>
    {item.title}
  </span>
  <span>
  {` (by: ${item.author} to: ${item.assigned_to})`}
  </span>
  { displayButtons && questionButtons }
  { displayAnswer && questionAnswer }
  <span>
    {next !== null && (
      <Button onClick={handleNextClick}>{next.verb}</Button>
    )}
    <Button onClick={() => deleteItem(item.id)}>x</Button>
  </span>
  </>
  );
}