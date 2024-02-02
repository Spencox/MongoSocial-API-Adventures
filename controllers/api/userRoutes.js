const router = require('express').Router();
const { User } = require('../../models');
const { ObjectId } = require('mongodb');

// read all users from db
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

// read all users from db
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id});
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (err) {
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

// create new user
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

// read all users from db
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
