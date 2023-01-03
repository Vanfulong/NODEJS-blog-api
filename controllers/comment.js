const userModels = require('../models/user.model.js');
const postModels = require('../models/post.model.js');
const commentModels = require('../models/comment.model.js');

const commentController = {
    getComments: async (req, res) => {
        try {
            // get comments of a post
            const comments = await commentModels.find({ post: req.params.id });
            res.json({ data: comments, success: true });
        } catch (err) {
            res.status(500).json({ msg: err.message ,success: false});
        }
    },
    createComment: async (req, res) => {
        try {
            // get post
            const post = await postModels.findById(req.body.postId);
            // create new comment
            const newComment = await commentModels.create({
                content: req.body.content,
                user: req.body.userId,
                post: req.body.postId,
            });
            // add comment to post
            post.comments.push(newComment._id);
            await post.save();
            res.json({ data: newComment, success: true });
        } catch (err) {
            res.status(500).json({ msg: err.message ,success: false});
        }
    },
    updateComment: async (req, res) => {
        try {
            const newComment = await commentModels.findByIdAndUpdate(req.params.id, {
                content: req.body.content,
            });
            res.json({ data: newComment, success: true });
        } catch (err) {
            res.status(500).json({ msg: err.message ,success: false});
        }
    },
    deleteComment: async (req, res) => {
        try {
            // get post
            const post = await postModels.findById(req.body.postId);
            // delete comment from post
            post.comments.pull(req.params.id);
            await post.save();
            // delete comment from database 
            await commentModels.findByIdAndDelete(req.params.id);
            res.json({ msg: "Comment deleted", success: true});
        } catch (err) {
            res.status(500).json({ msg: err.message ,success: false});
        }
    },
};

module.exports = commentController;
