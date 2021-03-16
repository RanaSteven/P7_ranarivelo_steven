const express = require('express');
const router = express.Router();
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const userControllers = require('../controllers/user');

router.get('/', userControllers.getAllProfiles);
router.get('/:id', userControllers.getProfile);
router.put('/modify/:id', multer, userControllers.modifyProfile);
router.delete('/delete/:id', userControllers.deleteProfile);

module.exports = router;