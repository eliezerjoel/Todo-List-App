import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ updateTasks }) => { // Pass updateTasks function as a prop
    const [task, setTask] = useState('');

    const handleAddClick = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                console.log(result);
                updateTasks(); // Call updateTasks function after successful addition
                setTask('')
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='create_form'>
            <input name='' placeholder='Enter a task' value={task} onChange={(e) => setTask(e.target.value)} type="text" />
            <button onClick={handleAddClick} type='button'>Add</button>
        </div>
    );
};

export default Create;
