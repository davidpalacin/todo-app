import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router'
import { data } from './utils/data'
import TaskCard from './components/TaskCard/TaskCard'

function App() {
  const [tasks, setTasks] = useState(data)
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  localStorage.setItem('filter', filter)

  const filterByStatus = (e: any) => {
    setFilter(e.target.value)
    localStorage.setItem('filter', filter)
  }

  const openCreateTask = () => {
    navigate('/create')
  }

  useEffect(() => {
    if (filter === 'all') {
      setTasks(data)
    } else if (filter === 'in progress') {
      setTasks(data.filter((task) => task.status === 'in progress'))
    } else if (filter === 'completed') {
      setTasks(data.filter((task) => task.status === 'completed'))
    } else if (filter === 'pending') {
      setTasks(data.filter((task) => task.status === 'pending'))
    }
  }, [filter])


  return (
    <div className="main">

      <h3 className='title'>TASK MANAGER</h3>
      <select onChange={filterByStatus} className='slctStatus'>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in progress">In progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={openCreateTask} className="createTask">
        +
      </button>

      <div className="main">
        {
          tasks.length >= 1
            ? tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
            : `Any task here... Start building something awesome and use me as a Task Manager! 😁`
        }
      </div>
    </div>
  )
}

export default App
