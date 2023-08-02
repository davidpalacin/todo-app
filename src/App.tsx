import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router'
import { data } from './utils/data'

function App() {
  const [tasks] = useState(data)
  const navigate = useNavigate()
  const openCreateTask = () => {
    navigate('/create')
  }

  return (
    <div className="main">
      <h3 className='title'>The ultimate TODO App</h3>

      <button onClick={openCreateTask} className="createTask">
        +
      </button>

      <div className="box">
        {
          tasks.length >= 1
            ? tasks.map((task) => (
              <div onClick={() => navigate(`task/${task.id}`)} className='task' key={task.id}>{task.title}</div>
            ))
            : 'The task list is empty...'
        }
      </div>
    </div>
  )
}

export default App
