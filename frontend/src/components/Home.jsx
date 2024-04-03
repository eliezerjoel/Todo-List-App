import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTasks(result.data))
            .catch(err => console.error(err));
    };

    const updateTasks = () => {
        fetchTasks();
    };
    const handleEdit = (id) =>{        
        axios.put('http://localhost:3001/update/'+id)
            .then(result => fetchTasks())
            .catch(err => console.error(err));

    }
    const handleDelete = (id) =>{        
        axios.delete('http://localhost:3001/delete/'+id)
            .then(result => fetchTasks())
            .catch(err => console.error(err));

    }
    return (
        <div className='home'>
            <h2>ToDo List</h2>
            <Create updateTasks={updateTasks} />
            {
                tasks.length === 0 ?
                <h2>No tasks to do</h2> :
                tasks.map((task, index) => (
                    <div className='task' key={index}>
                        <div className="checkbox" onClick={()=>handleEdit(task._id)}>
                            {task.isDone ? <BsFillCheckCircleFill className='icon' /> : <BsCircleFill className='icon' />}
                            <p className={task.isDone?'line_through':''}>{task.task}</p>
                        </div>
                        <div><span>
                            <BsFillTrashFill onClick={()=>handleDelete(task._id)} className='icon'/>
                        </span></div>
                        
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
