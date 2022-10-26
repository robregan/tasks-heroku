const TaskForm = ({
  createTask,
  name,
  handleChange,
  isEditing,
  updateTask,
}) => {
  return (
    <form onSubmit={isEditing ? updateTask : createTask} className='task-form'>
      <input
        type='text'
        name='name'
        placeholder='Add Task...'
        value={name}
        onChange={handleChange}
      />
      <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
    </form>
  )
}

export default TaskForm
