const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const authControllers = require('../controllers/auth');

router.post('/login', authControllers.login);
router.post('/loginAdmin', authControllers.loginAdmin);
router.post('/signup', authControllers.signup);

module.exports = router;