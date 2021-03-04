import styles from './QuestionDisplay.module.scss';

export default function QuestionDisplay({item, setAnswer, currentUser}) {
  const questionForm = (
    <div className={styles.form} onChange={e => setAnswer(e.target.value)}>
      <div className={styles.formRadio}>
        <input type="radio" id="yes" name="question" value="yes" />
        <label htmlFor="yes">Yes</label>
      </div>
      <div className={styles.formRadio}>
        <input type="radio" id="no" name="question" value="no" />
        <label htmlFor="no">No</label>
      </div>
    </div>);
  const isAssignedToMe = item.assigned_to === currentUser;
  const displayForm = isAssignedToMe && item.status === 'NEW';

  const answer = <div className={styles.answer}>Answer: {item.answer}</div>;
  const displayAnswer = item.status === 'COMPLETE';

  return (<div>
    <div>{item.description}</div>
    {displayForm && questionForm}
    {displayAnswer && answer}
  </div>)
}