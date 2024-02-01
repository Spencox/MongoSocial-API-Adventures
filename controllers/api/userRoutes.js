const router = require('express').Router();
const { User } = require('../../models');

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
    res.status(201).json(`UPDATE USER`);
  } catch (err) {
    res.status(400).json(err);
  }
});

// read all users from db
router.delete('/:id', async (req, res) => {
  try {
    
    
    
    
   
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
