import {useState} from 'react';
import './App.css';


function App({todos, addTodo, removeTodo}) {
  const [todoField, setTodoField] = useState('');

  const handleAddClick = () => {
    if(todoField.length === 0) {
      return;
    }
    addTodo(todoField);
    setTodoField('');
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }  
  }

  return (
    <div className="App">
      <input type='text' value={todoField} onKeyPress={handleKeyPress} onChange={e => setTodoField(e.target.value)} />
      <button onClick={handleAddClick}>Add Task</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.item}
            <button onClick={() => removeTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
