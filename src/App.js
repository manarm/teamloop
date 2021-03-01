import {useState} from 'react';
import './App.css';


function App({tasks, addTask, deleteTask, setCompleteTask}) {
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
      <dl>
        {uncompletedTasks.map(task => (
          <dt key={task.id}>
            <input type="checkbox" onChange={() => setCompleteTask(task.id, true)}/>
            {task.item}
            <button onClick={() => deleteTask(task.id)}>x</button>
          </dt>
        ))}
      </dl>
      {completedTasks.length > 0 && 
        <dl className="completedList">
          {completedTasks.map(task => (
              <dt className="completedTask" key={task.id}>
                <input type="checkbox" checked={true} onChange={() => setCompleteTask(task.id, false)}/>
                {task.item}
                <button onClick={() => deleteTask(task.id)}>x</button>
              </dt>
            ))}
        </dl>
      }
    </div>
  );
}

export default App;
