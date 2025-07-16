import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('/api/tasks').then((res) => setTasks(res.data));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await axios.post('/api/tasks', { text });
    setTasks([...tasks, res.data]);
    setText('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    <h1>Todo App</h1>
    <form onSubmit={addTask}>
    <input
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Enter task"
    />
    <button type="submit">Add</button>
    </form>
    <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
