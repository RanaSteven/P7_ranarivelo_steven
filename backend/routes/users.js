const express = require('express');
const router = express.Router();
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const userControllers = require('../controllers/user');

router.get('/:id', auth, userControllers.getProfile);
router.put('/modify/:id', userControllers.modifyProfile);
router.put('/modifyPassword', userControllers.modifyPassword);
router.delete('/delete/:id', auth, userControllers.deleteProfile);

module.exports = router;