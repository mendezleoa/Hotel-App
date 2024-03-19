const mongoose = require('mongoose')
const { Schema } = mongoose

const blogSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mensaje: {
      type: String,
      min: 3,
      max: 255,
      required: true
    },
    state: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Blog', blogSchema)
