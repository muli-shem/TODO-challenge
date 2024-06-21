import React, { useReducer, useEffect, useState } from 'react';
import './App.scss';
import { todoReducer,  } from './Reducer';

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  });

  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', text });
      setText('');
    }
  };

  return (
    <div className="Container">

      <h1>TO DO</h1> 
      <div>
        {/* <img src={background} alt="background" /> */}
      </div>
      
      <form className="add" onSubmit={handleSubmit}>
       
        <input
          type="text"
          placeholder="Create a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <div className="Todo">
        {todos.map((todo) => (
          <div key={todo.id} className="Button">
            <div className="TodoApp">
              
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
              />
              
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              
              <button className='Does' onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}>X</button>
              {/* <button onClick={() => dispatch({ type: 'EDIT_TODO', id: todo.id, text })}>Edit</button> */}
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <span>{todos.length} items left</span>
        <div className="filter-buttons">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear Completed</button>
      </div>
    </div>
  );
};

export default App;
