const router = require('express').Router();
const { User } = require('../../models');
const { ObjectId } = require('mongodb');

// read all users from db
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// read all users from db
router.get('/:id', async (req, res) => {
  try {
    res.status(200).json(`GET USER ID: ${req.params.id}`);
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
router.put('/', async (req, res) => {
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
