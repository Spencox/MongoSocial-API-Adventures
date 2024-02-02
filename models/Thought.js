const { Schema, model } = require('mongoose');

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
    },
    id: false,
  }
);

// Create a virtual property 'friendCount' 
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
