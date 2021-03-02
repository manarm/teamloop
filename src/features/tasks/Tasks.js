import { connect } from 'react-redux';
import styles from './Tasks.module.scss';
import {addTask, deleteTask, setCompleteTask, setFilter} from './tasksSlice';
import AddItem from './AddItem';
import FilterSelect from './FilterSelect';
import ItemDisplay from './ItemDisplay';
import Header from '../common/Header'

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
      <ItemDisplay tasks={uncompletedTasks} listIsComplete={false} setCompleteTask={setCompleteTask} deleteTask={deleteTask} />
      <ItemDisplay tasks={completedTasks} listIsComplete={true} setCompleteTask={setCompleteTask} deleteTask={deleteTask} />
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
