import { useParams, useNavigate } from "react-router"
import { data } from "../../utils/data"
import { useEffect, useState } from "react"
import "./taskDetail.css"

export default function TaskDetail() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState(data)
    const { id } = useParams()
    const [editMode, setEditMode] = useState(false)
    const thisTask = tasks.find(task => task.id.toString() === id)
    const [editTitle, setEditTitle] = useState(thisTask?.title)
    const [editContent, setEditContent] = useState(thisTask?.content)
    const [btnText, setBtnText] = useState('')
    const [status, setStatus] = useState(thisTask?.status)


    useEffect(() => {
        // If the task is not found, navigate back to the base URL
        if (!thisTask) {
            navigate('/');
        }
    }, [thisTask, navigate]);

    useEffect(() => {
        if (status === 'pending') { setBtnText('Mark as in progress') }
        if (status === 'in progress') { setBtnText('Mark as completed') }
        if (status === 'completed') { setBtnText('Mark as pending') }
    }, [status])

    if (!thisTask) return null

    const handleDeleteTask = () => {
        const index = tasks.indexOf(thisTask)
        tasks.splice(index, 1)
        setTasks(tasks)
        navigate('/')
    }

    const handleEditMode = () => {
        setEditMode(true)
    }

    const handleSaveChanges = () => {
        if (editContent) thisTask.content = editContent
        if (editTitle) thisTask.title = editTitle
        setEditMode(false)
    }

    const handleChangeStatus = () => {
        if (status === 'pending') {
            setStatus('in progress');
            thisTask.status = 'in progress'
        }
        if (status === 'in progress') {
            setStatus('completed');
            thisTask.status = 'completed'
        }
        if (status === 'completed') {
            setStatus('pending');
            thisTask.status = 'pending'
        }
    }

    return (
        <>
            {
                editMode
                    ? (
                        <div className="editBox">
                            <h3>Title</h3>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                            />
                            <h3>Content</h3>
                            <input
                                type="text"
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                            />

                            <button onClick={handleSaveChanges} className="saveChanges">Save</button>
                        </div>
                    )
                    : (
                        <>
                            <h3>{thisTask.title}</h3>
                            <p>{thisTask.content}</p>

                            <div className="buttons">
                                <button onClick={handleDeleteTask} className="deleteTask">
                                    Delete
                                </button>
                                <button onClick={handleEditMode} className="editTask">Edit</button>
                                <button onClick={handleChangeStatus} className="markAsCompleted">
                                    {btnText}
                                </button>
                            </div>
                        </>
                    )}
        </>
    )
}
