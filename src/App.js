import {useState} from 'react';
import clsx from 'clsx';
import './App.css';


function App({tasks, filter, setFilter, addTask, deleteTask, setCompleteTask}) {
  const [taskField, setTaskField] = useState('');

  const availableTasks = tasks.filter(task => {
    return filter === 'ALL' ||
    (filter === 'PENDING' && !task.is_complete) ||
    (filter === 'COMPLETE' && task.is_complete) 
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
    <div className="App">
      <div>
        <input type='text' value={taskField} onKeyPress={handleKeyPress} onChange={e => setTaskField(e.target.value)} />
        <button onClick={handleAddClick}>Add Task</button>
      </div>
      <div className="filter">Display
        {['all', 'pending', 'complete'].map(name => {
          const className = clsx({
            'filter__button': true,
            'filter__button--active': name.toUpperCase() === filter 
          })
          return <button key={name} className={className} onClick={() => setFilter(name.toUpperCase())}>{name}</button> 
        })} 

      </div>
      <dl>
        {uncompletedTasks.map(task => (
          <dt key={task.id}>
            <input type="checkbox" onChange={() => setCompleteTask(task.id, true)}/>
            {task.item}
            <button onClick={() => deleteTask(task.id)}>x</button>
          </dt>
        ))}
      {completedTasks.length > 0 && 
        completedTasks.map(task => (
            <dt className="completedTask" key={task.id}>
              <input type="checkbox" checked={true} onChange={() => setCompleteTask(task.id, false)}/>
              {task.item}
              <button onClick={() => deleteTask(task.id)}>x</button>
            </dt>
          ))}
      </dl>
    </div>
  );
}

export default App;
