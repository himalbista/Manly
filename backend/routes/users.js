var express = require('express');
const { getUserById, getUser } = require('../controllers/user_controller');
const { isSinedIn, isAuthenticated } = require('../controllers/auth_controller');
var router = express.Router();

router.param('userId',getUserById);

router.get('/:userId', isSinedIn, isAuthenticated, getUser);

module.exports = router;
