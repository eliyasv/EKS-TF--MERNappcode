import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
    return (
        <ul>
        {tasks.map((task) => (
            <li key={task._id}>
            {task.text}
            <button onClick={() => onDelete(task._id)} style={{ marginLeft: '10px' }}>
            Delete
            </button>
            </li>
        ))}
        </ul>
    );
};

export default TaskList;
