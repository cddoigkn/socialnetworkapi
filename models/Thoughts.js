const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, 'body must be less than or equal to 280 characters!']
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dateFormat
    }
  }
)

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, 'thought text should be at least one character!'],
      maxlength: [280, 'thought text should be less than or equal to 280 characters!']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dateFormat
    },
    username: {
      type: String,
      required: true
    },
    reactions: {
      type: [reactionSchema]
    }
  }
)

function dateFormat(createdAt) {
  const format = createdAt.toUTCString()
  return format
}

thoughtSchema.virtual('reactionCount').get(function () {
  return thoughtSchema.reactions.length;
});

const Thoughts = mongoose.model("Thoughts", thoughtSchema)
module.exports = Thoughts;