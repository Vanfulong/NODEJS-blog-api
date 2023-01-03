const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.js');

router.get('/:id', commentController.getComments);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;