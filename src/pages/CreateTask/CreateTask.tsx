import { useState } from 'react'
import './createTask.css'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { createOne } from '../../features/task/taskSlice'

export default function CreateTask() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const handleContent = (event: any) => {
        setContent(event.target.value)
    }

    const handleCreateTask = () => {
        if (title.trim() === "" || content.trim() === "") return
        dispatch(createOne({ content, title }))
        navigate('/')
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
