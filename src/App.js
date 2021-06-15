import './App.css';
import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, List } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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

    setInput('');
  }
  return (
    <div className="App">
      <h1>NegTask 🌵 </h1>
      <FormControl>
        <InputLabel>✔ Write a new task to do</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>Add Todo</Button>
      </FormControl>
      
      <List>
        {todos.map(todo => (<Todo key={todo.id} id={todo.id} text={todo.todo} deadline={new Date().toLocaleDateString()}/>))}
      </List>
    </div>
  );
}

export default App;
