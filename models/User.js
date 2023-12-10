// assistance received to help shorten this a bit in the future //
const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      // adds an error in case the user doesn't have a username put in //
      required: [true, 'we need a username!'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'we need an email!'],
      unique: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'we need a valid email!']
    },
    thoughts: {
      type: [Schema.Types.ObjectId],
      ref: 'Thought'
    },
    friends: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    }
  },

  {
    timestamps: true
  }
)

userSchema.virtual('friendCount').get(function () {
  return userSchema.friends.length;
});

const User = model("User", userSchema)
module.exports = User;