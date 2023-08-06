import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CreateTask from './pages/CreateTask/CreateTask.tsx'
import TaskDetail from './pages/TaskDetail/TaskDetail.tsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

const router = createHashRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create",
    element: <CreateTask />
  },
  {
    path: "/task/:id",
    element: <TaskDetail />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
