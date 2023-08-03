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
  const handleOptions = () => {
    console.log('click options')
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
              <section key={task.id} className="task-box">
                <div onClick={() => navigate(`task/${task.id}`)} className='task'>
                  {task.title}
                </div>
                  <button onClick={handleOptions} className='btnOptions'>⚫ ⚫ ⚫</button>
              </section>
            ))
            : 'The task list is empty...'
        }
      </div>
    </div>
  )
}

export default App
