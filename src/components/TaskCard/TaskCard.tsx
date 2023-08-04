import { useNavigate } from "react-router"
import { useState } from 'react'
import { type Task } from "../../types/types"
import './taskCard.css'
import MenuOptions from "../MenuOptions/MenuOptions"

export default function TaskCard({ task }: { task: Task }) {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div>
            <section className="task-box">
                <div onClick={() => navigate(`task/${task.id}`)} className='task'>
                    {task.title}
                </div>
                <button onClick={toggleMenu} className='btnOptions'>⚫ ⚫ ⚫</button>
            </section>
            {
                isMenuOpen && (
                    <MenuOptions task={task} />
                )
            }

        </div>
    )
}
