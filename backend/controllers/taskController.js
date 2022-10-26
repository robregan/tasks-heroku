const Task = require('../model/taskModel')

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ error: `Task not found with ID: ${id}` })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
      return res.status(404).json({ error: `Task not found with ID: ${id}` })
    }
    res.status(200).json('task deleted')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ error: `Task not found with ID: ${id}` })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createTask, getTasks, getTask, deleteTask, updateTask }
