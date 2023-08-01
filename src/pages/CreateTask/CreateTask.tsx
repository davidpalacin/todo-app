import { useState } from 'react'
import './createTask.css'
import { taskArr } from '../../services/getTasks'

export default function CreateTask() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tasks, setTasks] = useState(taskArr)


    const handleTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const handleContent = (event: any) => {
        setContent(event.target.value)
    }

    const handleCreateTask = () => {
        const newId = tasks.length + 1
        tasks.push({ id: newId, title, content })
        setTasks(tasks)
        console.log(tasks)
    }

    return (
        <div className="taskForm">
            <div className="taskFormTitle">
                <h3>Choose a title for your note</h3>
                <input onChange={handleTitle} type="text" />
            </div>

            <div className="taskFormContent">
                <h3>Write your note</h3>
                <textarea onChange={handleContent} />
            </div>

            <button onClick={handleCreateTask} className="confirm">
                Create
            </button>
        </div>
    )
}
