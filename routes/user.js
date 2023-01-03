const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);



module.exports = router;