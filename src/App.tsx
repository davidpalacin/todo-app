import { useState } from 'react'
import './App.css'
import { taskArr } from './services/getTasks'
import { useNavigate } from 'react-router'

function App() {
  const [tasks, setTasks] = useState(taskArr)
  const navigate = useNavigate()
  const openCreateTask = () => {
    navigate('/create-task')
  }
  return (
    <div className="main">
      <h3 className='title'>The ultimate TODO App</h3>

      <button onClick={openCreateTask} className="createTask">
        +
      </button>

      <div className="box">
        {
          tasks.map((task) => (
            <div className='task' key={task.id}>{task.title}</div>
          ))
        }
      </div>
    </div>
  )
}

export default App
