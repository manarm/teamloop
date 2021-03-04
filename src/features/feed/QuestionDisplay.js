export default function QuestionDisplay({item, setAnswer, currentUser}) {
  const questionForm = (
    <div onChange={e => setAnswer(e.target.value)}>
      <input type="radio" id="yes" name="question" value="yes" />
      <label htmlFor="yes">Yes</label>
      <input type="radio" id="no" name="question" value="no" />
      <label htmlFor="no">No</label>
    </div>);
  const isAssignedToMe = item.assigned_to === currentUser;
  const displayForm = isAssignedToMe && item.status === 'NEW';

  const answer = <div>Answer: {item.answer}</div>;
  const displayAnswer = item.status === 'COMPLETE';

  return (<div>
    <div>{item.description}</div>
    {displayForm && questionForm}
    {displayAnswer && answer}
  </div>)
}