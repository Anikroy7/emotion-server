const express = require('express');
const commentsController = require('../controller/comments.controller')
const router= express.Router();


router.route('/')
.get(commentsController.getComments)
.post(commentsController.createComment)

router.route('/:id')
.get(commentsController.getCommentById)
.delete(commentsController.deleteCommentById)
.put(commentsController.updateComment)

module.exports= router;