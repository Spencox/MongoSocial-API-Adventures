const router = require('express').Router();
const apiRoutes = require('./api');

// set up api routes 
router.use('/api', apiRoutes);

module.exports = router;