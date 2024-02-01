const router = require('express').Router();
const userRoutes = require('./userRoutes');


// set up api routes
router.use('/users', userRoutes);

module.exports = router;
