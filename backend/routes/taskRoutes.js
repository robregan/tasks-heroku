const express = require('express')
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController')
const router = express.Router()

router.route('/').get(getTasks).post(createTask)
router.route('/:id').get(getTask).delete(deleteTask).put(updateTask)

module.exports = router
