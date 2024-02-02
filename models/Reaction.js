const { Schema, model, ObjectId } = require('mongoose');

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
  }
);

// Initialize our User model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
