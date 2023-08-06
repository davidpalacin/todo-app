import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import "./taskDetail.css"
import { useSelector, useDispatch } from 'react-redux'
import { deleteOne, changeStatus, editTask } from '../../features/task/taskSlice'
import { RootState } from "../../store/store"

export default function TaskDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const { id } = useParams()
  if (!id) return
  const taskId = parseInt(id);
  const [editMode, setEditMode] = useState(false)
  const thisTask = tasks.find(task => task.id === taskId)
  if (!thisTask) return
  const [editTitle, setEditTitle] = useState(thisTask.title)
  const [editContent, setEditContent] = useState(thisTask.content)
  const [btnText, setBtnText] = useState('')

  useEffect(() => {
    // If the task is not found, navigate back to the base URL
    if (!thisTask) {
      navigate('/');
    }
  }, [thisTask, navigate]);

  useEffect(() => {
    if (thisTask?.status === 'pending') { setBtnText('Mark as in progress') }
    if (thisTask?.status === 'in progress') { setBtnText('Mark as completed') }
    if (thisTask?.status === 'completed') { setBtnText('Mark as pending') }
  }, [thisTask?.status])

  if (!thisTask) return null

  const handleDeleteTask = () => {
    dispatch(deleteOne(taskId))
    navigate('/')
  }

  const handleEditMode = () => {
    setEditMode(true)
  }

  const handleSaveChanges = () => {
    dispatch(editTask({ id: taskId, newContent: editContent, newTitle: editTitle }))
    setEditMode(false)
  }

  const handleChangeStatus = () => {
    dispatch(changeStatus({ id: thisTask.id }))
  }

  const checkEnterPress = (e: any) => {
    if (e.key === "Enter") handleSaveChanges()
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
                onKeyDown={checkEnterPress}
              />
              <h3>Content</h3>
              <input
                type="text"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                onKeyDown={checkEnterPress}
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
