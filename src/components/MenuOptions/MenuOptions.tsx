import { Task } from "../../types/types";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { data } from "../../utils/data"
import './menuOptions.css'


export default function MenuOptions({ task }: { task: Task }) {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState(data)

    const deleteTask = () => {
        const index = tasks.indexOf(task)
        tasks.splice(index, 1)
        setTasks(tasks)
        navigate('/')
    }

    const statusTask = () => {
        console.log(task.status)
    }

    return (
        <div className='menuOptions'>
            <button onClick={deleteTask} className='menuOptionsDelete'>Delete</button>
            <button onClick={statusTask} className='menuOptionsChangeStatus'>Change status</button>
        </div>
    )
}
