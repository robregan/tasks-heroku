import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Task from './Task'
import TaskForm from './TaskForm'
import axios from 'axios'
import { URL } from '../App'
import loader from '../assets/loader.gif'
// http://localhost:5000/api/tasks/

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    completed: false,
  })

  const { name } = formData

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getTasks = async () => {
    setIsLoading(true)

    try {
      const { data } = await axios.get(`${URL}/api/tasks`)
      setTasks(data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const createTask = async (e) => {
    e.preventDefault()
    if (name === '') {
      return toast.error('input field can not be empty, cmon now...')
    }
    try {
      await axios.post(`${URL}/api/tasks/`, formData)
      setFormData({ ...formData, name: '' })
      toast.success('task created!')
      getTasks()
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      toast.success('task deleted!')
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false })
    setTaskId(task._id)
    setIsEditing(true)
  }

  const updateTask = async (e) => {
    e.preventDefault()
    if (name === '') {
      return toast.error('input field can not be empty, cmon now...')
    }

    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData)
      toast.success('task updated!')

      setFormData({ ...formData, name: '' })
      setIsEditing(false)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const completeTask = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    }
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const cTask = tasks.filter((task) => task.completed === true)
    setCompletedTasks(cTask)
  }, [tasks])

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleChange={handleChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className='--flex-between --pb'>
          <p>
            <strong>Total Tasks: </strong>
            {tasks.length}
          </p>
          <p>
            <strong>Completed Tasks: </strong>
            {completedTasks.length}
          </p>
        </div>
      )}
      <hr />
      {isLoading && (
        <div className='--flex-center'>
          <img src={loader} alt='loading' />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className='--text-center'>No tasks yet...</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                completeTask={completeTask}
                updateTask={updateTask}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

export default TaskList
