const express = require('express');
const fs = require('fs');
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const commentsControllers = require('../controllers/comments');

router.post('/createComment/:idPosts/:Posts_Utilisateurs_id/:id', auth, commentsControllers.createComment);
router.get('/', auth, commentsControllers.getAllComments);
router.put('/modify/:id', auth, commentsControllers.modifyComment);
router.delete('/delete/:id', auth, commentsControllers.deleteComment);

module.exports = router;