import { useNavigate } from "react-router"
import { useState, useEffect } from 'react'
import { type Task } from "../../types/types"
import './taskCard.css'
import { data } from "../../utils/data"

export default function TaskCard({ task }: { task: Task }) {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [tasks, setTasks] = useState(data)
    const [btnText, setBtnText] = useState('')
    const [status, setStatus] = useState(task.status)
    const [statusClass, setStatusClass] = useState('')

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        if (status === 'pending') {
            setBtnText('Mark as in progress')
            setStatusText('Pending')
            setStatusClass('pendingText')
        }
        if (status === 'in progress') {
            setBtnText('Mark as completed')
            setStatusText('In progress')
            setStatusClass('inProgressText')
        }
        if (status === 'completed') {
            setBtnText('Mark as pending')
            setStatusText('Completed')
            setStatusClass('completedText')
        }
    }, [status])

    const deleteTask = () => {
        const index = tasks.indexOf(task)
        tasks.splice(index, 1)
        setTasks(tasks)
        navigate('/')
    }

    const handleChangeStatus = () => {
        if (status === 'pending') {
            setStatus('in progress');
            task.status = 'in progress'
        }
        if (status === 'in progress') {
            setStatus('completed');
            task.status = 'completed'
        }
        if (status === 'completed') {
            setStatus('pending');
            task.status = 'pending'
        }
        setIsMenuOpen(false)
    }

    return (
        <div>
            <section className="task-box">
                <div onClick={() => navigate(`task/${task.id}`)} className='task'>
                    {task.title}
                </div>
                <span className={`taskStatus ${statusClass}`}>{statusText}</span>
                <button onClick={toggleMenu} className='btnOptions'>⚫ ⚫ ⚫</button>
            </section>
            {
                isMenuOpen && (
                    <div className='menuOptions'>
                        <button onClick={handleChangeStatus} className='menuOptionsChangeStatus'>{btnText}</button>
                        <button onClick={deleteTask} className='menuOptionsDelete'>Delete</button>
                    </div>
                )
            }
        </div>
    )
}
