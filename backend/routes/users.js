const express = require('express');
const router = express.Router();
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const userControllers = require('../controllers/user');

router.get('/:id', auth, userControllers.getProfile);
router.put('/modifyProfile/:id', auth, userControllers.modifyProfile);
router.put('/modifyPassword/:id', auth, userControllers.modifyPassword);
router.delete('/delete/:id', auth, userControllers.deleteProfile);

module.exports = router;