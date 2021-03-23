const express = require('express');
const fs = require('fs');
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const postsControllers = require('../controllers/post');

router.get('/:id', auth, postsControllers.getAllIdPosts);
router.get('/', auth, postsControllers.getAllPosts);
router.get('/admin', postsControllers.getAdminAllPosts);
router.post('/createPost', auth, postsControllers.createPost);
router.put('/validePost', auth, postsControllers.validePost);
router.put('/modify/:id', auth, postsControllers.modifyPost);
router.delete('/delete/:id', auth, postsControllers.deletePost);
//router.get('/onePost/:id', auth, postsControllers.getOnePostId);

module.exports = router;