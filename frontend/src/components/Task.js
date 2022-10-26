import { FaEdit, FaCheckDouble, FaTrash } from 'react-icons/fa'

const Task = ({ task, index, deleteTask, getSingleTask, completeTask }) => {
  return (
    <div className={task.completed ? 'task completed' : 'task'}>
      <p>
        <strong>{index + 1}. </strong>
        {task.name}
      </p>
      <div className='task-icons'>
        <FaCheckDouble color='green' onClick={() => completeTask(task)} />
        <FaEdit color='purple' onClick={() => getSingleTask(task)} />
        <FaTrash color='red' onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  )
}

export default Task
