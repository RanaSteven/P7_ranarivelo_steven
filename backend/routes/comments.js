const express = require('express');
const fs = require('fs');
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const commentsControllers = require('../controllers/comments');

router.get('/', commentsControllers.getAllComments);
router.post('/', commentsControllers.createComment);
router.put('/modify/:id', commentsControllers.modifyComment);
router.delete('/delete/:id', commentsControllers.deleteComment);

module.exports = router;