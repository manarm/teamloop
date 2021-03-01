import {useState} from 'react';
import './App.css';


function App({tasks, addTask, deleteTask, completeTask}) {
  const [taskField, setTaskField] = useState('');

  const completedTasks = tasks.filter(task => task.is_complete);
  const uncompletedTasks = tasks.filter(task => !task.is_complete);

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
      <input type='text' value={taskField} onKeyPress={handleKeyPress} onChange={e => setTaskField(e.target.value)} />
      <button onClick={handleAddClick}>Add Task</button>
      <ul>
        {uncompletedTasks.map(task => (
          <li key={task.id}>
            {task.item}
            <button onClick={() => completeTask(task.id)}>✓</button>
            <button onClick={() => deleteTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
      {completedTasks.length > 0 && 
        <ul className="completedList">
          {completedTasks.map(task => (
              <li className="completedTask" key={task.id}>
                {task.item}
                <button onClick={() => deleteTask(task.id)}>x</button>
              </li>
            ))}
        </ul>
      }
    </div>
  );
}

export default App;
