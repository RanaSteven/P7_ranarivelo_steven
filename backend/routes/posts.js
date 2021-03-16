const express = require('express');
const fs = require('fs');
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const postsControllers = require('../controllers/post');

router.get('/:id', postsControllers.getAllIdPosts);
router.get('/', postsControllers.getAllPosts);
router.post('/', postsControllers.createPost);
router.put('/modify/:id', postsControllers.modifyPost);
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;