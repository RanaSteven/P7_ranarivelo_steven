const express = require('express');
const fs = require('fs');
const auth = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const adminControllers = require('../controllers/admin');


router.get('/', auth, adminControllers.getAllAdminPosts);
router.put('/validePost/:idPosts', adminControllers.validePost);
router.put('/valideComment/:idComments', adminControllers.valideComment);

module.exports = router;