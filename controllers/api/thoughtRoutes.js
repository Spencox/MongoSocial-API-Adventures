const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');
const { ObjectId } = require('mongodb');

// get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    if (!thoughts) {
      return res.status(404).json({ message: 'No thoughts found' });
    }
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// get thought by id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.id});
    
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    
    res.status(200).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new thought
router.post('/', async (req, res) => {
  const { thoughtText, username } = req.body;
  const thoughtData = { thoughtText, username };
  try {
    const thought = await Thought.create(thoughtData);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId},
      {$addToSet: {thoughts: thought}},
      {new: true}
      );
    res.status(201).json(`Thought Successfully Created`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// update thought
router.put('/:id', async (req, res) => {
  try {
    const thought = new ObjectId(req.params.id);
  
    const updateThoughtText = req.body.thoughtText;

    // Check if the thought exists
    const existingThought = await Thought.findById(thought);

    if (existingThought) {
      // Update the username if a new value is provided
      if (updateThoughtText !== undefined) {
        existingThought.thoughtText = updateThoughtText;
      }

      // Save the updated thought
      await existingThought.save();

      res.status(200).json({ message: 'Thought updated successfully' });
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// add reaction to thought 
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      {$addToSet: {reactions: req.body
      }},
      {new: true}
      );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(201).json(`Reaction successfully added`);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete reaction from thought 
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    // Find the thought by its ID and remove the reaction with the given reactionId
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.status(200).json({ message: 'Reaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete thought by id
router.delete('/:id', async (req, res) => {
  try {
    const thoughtId = new ObjectId(req.params.id);
    const result = await Thought.deleteOne({ _id: thoughtId});
    const user = await User.findOneAndUpdate(
      { thoughts: thoughtId },
      { $pull: { thoughts: thoughtId } },
    );
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Thought deleted' });
    } else {
      res.status(404).json({ message: 'No thought found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
