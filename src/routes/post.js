const express = require('express');
const router = express();
const { createPost, updatePost, deletePost } = require('../controllers/post');

router.post('/post', createPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);



module.exports=router