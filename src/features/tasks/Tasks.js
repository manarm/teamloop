import { useState } from 'react';
import { connect } from 'react-redux';
import styles from './Tasks.module.scss';
import {addTask, deleteTask, setCompleteTask, setFilter} from './tasksSlice';

function Tasks({tasks, taskFilter, setFilter, addTask, deleteTask, setCompleteTask}) {
  const [taskField, setTaskField] = useState('');

  const availableTasks = tasks.filter(task => {
    return taskFilter === 'ALL' ||
    (taskFilter === 'PENDING' && !task.is_complete) ||
    (taskFilter === 'COMPLETE' && task.is_complete) 
  })
  const completedTasks = availableTasks.filter(task => task.is_complete);
  const uncompletedTasks = availableTasks.filter(task => !task.is_complete);

  const handleAddClick = () => {
    if(taskField.length === 0) {
      return;
    }
    addTask(taskField);
    setTaskField('');
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }  
  }

  return (
    <div className={styles.card}>
      <div className={styles.addTask}>
        <input type='text' value={taskField} onKeyPress={handleKeyPress} onChange={e => setTaskField(e.target.value)} />
        <button onClick={handleAddClick}>Add</button>
      </div>
      <div className={styles.filter}>
        <p>Display:</p>
        {['all', 'pending', 'complete'].map(name => {
          const className = name.toUpperCase() === taskFilter ? styles.active : '';
          return <button key={name} className={className} onClick={() => setFilter(name.toUpperCase())}>{name}</button> 
        })} 
      </div>
      <dl>
        {uncompletedTasks.map(task => (
          <dt key={task.id}>
            <input type="checkbox" onChange={() => setCompleteTask(task.id, true)}/>
            <p>{task.item}</p>
            <button onClick={() => deleteTask(task.id)}>x</button>
          </dt>
        ))}
      {completedTasks.length > 0 && 
        completedTasks.map(task => (
            <dt key={task.id}>
              <input type="checkbox" checked={true} onChange={() => setCompleteTask(task.id, false)}/>
              <p className={styles.completedTask}>{task.item}</p>
              <button onClick={() => deleteTask(task.id)}>x</button>
            </dt>
          ))}
      </dl>
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
