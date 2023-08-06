import { useNavigate } from "react-router"
import { useState, useEffect } from 'react'
import { type Task } from "../../types/types"
import './taskCard.css'
import { useDispatch } from 'react-redux'
import { deleteOne, changeStatus, filterBy } from "../../features/task/taskSlice"


export default function TaskCard({ task }: { task: Task }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [btnText, setBtnText] = useState('')
    const [statusClass, setStatusClass] = useState('')
    const thisFilter = localStorage.getItem('filter')
    if (!thisFilter) return

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        if (task.status === 'pending') {
            setBtnText('Mark as in progress')
            setStatusText('Pending')
            setStatusClass('pendingText')
        }
        if (task.status === 'in progress') {
            setBtnText('Mark as completed')
            setStatusText('In progress')
            setStatusClass('inProgressText')
        }
        if (task.status === 'completed') {
            setBtnText('Mark as pending')
            setStatusText('Completed')
            setStatusClass('completedText')
        }
        setIsMenuOpen(false)
    }, [task.status])

    const deleteTask = () => {
        dispatch(deleteOne(task.id))
    }

    const handleChangeStatus = () => {
        dispatch(changeStatus({ id: task.id }))
        dispatch(filterBy(thisFilter))
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
