import { connect } from 'react-redux';
import styles from './Tasks.module.scss';
import {addTask, deleteTask, setCompleteTask, setFilter} from './tasksSlice';
import AddItem from './AddItem';
import FilterSelect from './FilterSelect';
import Header from '../common/Header'
import Button from '../common/Button'

function Tasks({tasks, taskFilter, setFilter, addTask, deleteTask, setCompleteTask}) {
  const availableTasks = tasks.filter(task => {
    return taskFilter === 'ALL' ||
    (taskFilter === 'PENDING' && !task.is_complete) ||
    (taskFilter === 'COMPLETE' && task.is_complete) 
  })
  const completedTasks = availableTasks.filter(task => task.is_complete);
  const uncompletedTasks = availableTasks.filter(task => !task.is_complete);

  return (
    <div className={styles.card}>
      <Header />
      <AddItem addTask={addTask} />
      <FilterSelect taskFilter={taskFilter} setFilter={setFilter} />
      <div className={styles.itemsDisplay}>
        <dl>
          {uncompletedTasks.map(task => (
            <dt key={task.id}>
              <span>
                <input type="checkbox" onChange={() => setCompleteTask(task.id, true)}/>
                {task.item}
              </span>
              <Button onClick={() => deleteTask(task.id)}>x</Button>
            </dt>
          ))}
        {completedTasks.length > 0 && 
          completedTasks.map(task => (
              <dt key={task.id}>
                <span>
                  <input type="checkbox" checked={true} onChange={() => setCompleteTask(task.id, false)}/>
                  <span className={styles.completedTask}>{task.item}</span>
                  </span>
                <Button onClick={() => deleteTask(task.id)}>x</Button>
              </dt>
            ))}
        </dl>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    taskFilter: state.taskFilter
  }
}
const actionCreators = {addTask, deleteTask, setCompleteTask, setFilter};
export default connect(mapStateToProps, actionCreators)(Tasks);
