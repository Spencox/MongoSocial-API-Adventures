const { Schema, model, ObjectId, Types } = require('mongoose');
const dayjs = require('dayjs');

const transform = (doc, ret) => {
  ret.createdAt = dayjs(ret.createdAt).format('MMM D, YYYY [at] h:mm A');
  return ret;
};

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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

module.exports = reactionSchema;
