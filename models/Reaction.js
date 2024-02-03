const { Schema, model, ObjectId } = require('mongoose');

const transform = (doc, ret) => {
  ret.createdAt = dayjs(ret.createdAt).format('MMM D, YYYY [at] h:mm A');
  return ret;
};

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
  },
  {
    toJSON: {
      transform 
    },
  }
);

// Initialize our User model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
