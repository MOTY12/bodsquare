const producer = require('../queueWorkers/producer')
const consumer = require('../queueWorkers/consumer')
const {postModel} = require('../models/index')
const { io } = require('../utils/socketio')


const createPost = async (req, res) => {
    try {
        let post = new postModel({
            title: req.body.title,
            description: req.body.description,
            userId: req.user.id,
        });
        let postQueue = JSON.stringify(post)
        producer('post created', postQueue)

        consumer("post created")

        const postSaved = await post.save();

        //send event through socket
        io.emit('post created', postSaved)

        if (postSaved) {
            return res.status(200).json({
                message: 'Post created successfully'
            })
        } else {
            return res.status(400).json({
                message: 'Post not created'
            })
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const updatePost = async (req, res) => {
    try {
        let post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (post.userId != req.user.id) {
            return res.status(401).json({
                message: "You are not authorized to update this post",
            });
        }

        post.title = req.body.title;
        post.description = req.body.description;
        post.updateAt = Date.now();

        let postQueue = JSON.stringify(post)
        producer('post updated', postQueue)

        consumer("post updated")

        const postUpdated = await post.save();
        
        //send event through socket
        io.emit('post updated', postUpdated)

        if (postUpdated) {
            return res.status(200).json({
                message: 'Post updated successfully'
            })
        } else {

            return res.status(400).json({
                message: 'Post not updated'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const deletePost = async (req, res) => {
    try {
        let post = await postModel.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (post.userId != req.user.id) {
            return res.status(401).json({
                message: "You are not authorized to delete this post",
            });
        }

        let postQueue = JSON.stringify(post)
        producer('post deleted', postQueue)

        consumer("post deleted")

        const postDeleted = await post.remove();
        
        //send event through socket
        io.emit('post deleted', postDeleted)

        if (postDeleted) {
            return res.status(200).json({
                message: 'Post deleted successfully'
            })
        } else {
            return res.status(400).json({
                message: 'Post not deleted'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}



module.exports = {
    createPost,
    updatePost,
    deletePost
}


