import clsx from 'clsx';
import styles from './ItemDisplay.module.scss';
import Button from '../common/Button';

export default function ItemDisplay({tasks, listIsComplete, setCompleteTask, deleteTask}) {
  const taskStyle = clsx(listIsComplete && styles.completed);

  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
  <div className={styles.itemsDisplay}>
    <dl>
      {tasks.map(task => (
        <dt key={task.id}>
          <span>
            <input type="checkbox" checked={listIsComplete} onChange={() => setCompleteTask(task.id, !listIsComplete)}/>
            <span className={taskStyle}>
              {task.item}
            </span>
          </span>
          <Button onClick={() => deleteTask(task.id)}>x</Button>
        </dt>
      ))}
    </dl>
  </div>
  );
}