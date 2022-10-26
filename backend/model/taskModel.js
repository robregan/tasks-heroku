const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a task'],
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
