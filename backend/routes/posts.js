const express = require('express');
const fs = require('fs');
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const postsControllers = require('../controllers/post');

router.get('/:id', auth, postsControllers.getAllIdPosts);
router.get('/', auth, postsControllers.getAllPosts);
router.post('/createPost', auth, postsControllers.createPost);
router.put('/modify/:id', auth, postsControllers.modifyPost);
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;