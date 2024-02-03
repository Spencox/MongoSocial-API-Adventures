const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

// Define a transform function to format createdAt field
const transform = (doc, ret) => {
  ret.createdAt = dayjs(ret.createdAt).format('MMM D, YYYY [at] h:mm A');
  return ret;
};

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactions',
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform, 
    },
    id: false,
  }
);

// Create a virtual property 'reactionCount' 
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
