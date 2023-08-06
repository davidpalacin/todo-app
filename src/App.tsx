import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router'
import TaskCard from './components/TaskCard/TaskCard'
import { useSelector, useDispatch } from 'react-redux'
import { filterBy } from './features/task/taskSlice'
import { RootState } from './store/store'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.filteredTasks)
  const [filter, setFilter] = useState('all')

  const filterByStatus = (e: any) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    dispatch(filterBy(selectedFilter));
  }

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

  const openCreateTask = () => {
    navigate('/create')
  }

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
