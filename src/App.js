import './App.css';
import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })));
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })));
    });
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    if(input?.length === 0) return;
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input]);
  
    setInput('');
  }
  return (
    <div className="App">
      <h1>Helder's TODO list 🌵 </h1>
      <FormControl>
        <InputLabel>✔ Write a ToDo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>Add Todo</Button>
      </FormControl>
      
      <ul>
        {todos.map(todo => (<Todo id={todo.id} text={todo.todo} deadline={new Date().toLocaleDateString()}/>))}
      </ul>
    </div>
  );
}

export default App;
