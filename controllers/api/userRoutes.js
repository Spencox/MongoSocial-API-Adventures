const router = require('express').Router();
const { User } = require('../../models');
const { ObjectId } = require('mongodb');

// get all users from db
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id})
    .select('__v')
    .populate('thoughts')
    .populate('friends')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// create new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(`New User Successfully Created`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// update user
router.put('/:id', async (req, res) => {
  try {
    const user = new ObjectId(req.params.id);
    const updateUsername = req.body.username;
    const updateEmail = req.body.email;

    // Check if the user exists
    const existingUser = await User.findById(user);

    if (existingUser) {
      // Update the username if a new value is provided
      if (updateUsername !== undefined) {
        existingUser.username = updateUsername;
      }

      // Update the email if a new value is provided
      if (updateEmail !== undefined) {
        existingUser.email = updateEmail;
      }

      // Save the updated user
      await existingUser.save();

      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// add friend to user 
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId},
      {$addToSet: {friends: req.params.friendId}},
      {new: true}
      );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(201).json(`Friend successfully added`);
  } catch (err) {
    res.status(400).json(err);
  }
});

//remove friend from user
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Friend removed from user' });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: 'An error occurred while removing the friend' });
  }
});

// delete user
router.delete('/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await User.deleteOne({ _id: userId});
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Document deleted' });
    } else {
      res.status(404).json({ message: 'No document found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
