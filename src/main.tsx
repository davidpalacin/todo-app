import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CreateTask from './pages/CreateTask/CreateTask.tsx'
import TaskDetail from './pages/TaskDetail/TaskDetail.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create',
    element: <CreateTask />
  },
  {
    path: '/task/:id',
    element: <TaskDetail />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>
)
