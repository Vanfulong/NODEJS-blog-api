const postModel = require("../models/post.model.js");
const commentModel = require("../models/comment.model.js");
const categoryModel = require("../models/category.model.js");
const postController = {
    getPosts: async (req, res) => {
        try {
            const posts = await postModel.find().populate("author").populate("categorys").populate("comments");
            res.json({ data: posts, success: true });
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },
    getPostById: async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id).populate("author").populate("categorys").populate("comments");
            res.json({ data: post, success: true });
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, content, thumbnail,categorys,author } = req.body;
            const newPost = await postModel.create({
                title: title,
                content: content,
                thumbnail: thumbnail,
                categorys: categorys,
                author: author,
            });
            // add post to category
            for (let i = 0; i < newPost.categorys.length; i++) {
                const category = await categoryModel.findById(newPost.categorys[i].toString());
                category.posts.push(newPost._id.toString());
                await category.save();
            }
            res.json({ data: newPost , success: true});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updatePost: async (req, res) => {
        try {
            const { title, content, thumbnail } = req.body;
            await postModel.findByIdAndUpdate(req.params.id, {
                title: title,
                content: content,
                thumbnail: thumbnail,
            });
            res.json({ message: "Post updated" , success: true});
        } catch (err) {
            res.status(500).json({ message: err.message , success: false});
        }
    },
    deletePost: async (req, res) => {
        try {
            //delete all comments of the post
            const post = await postModel.findById(req.params.id);
            for (let i = 0; i < post.comments.length; i++) {
                commentModel.findByIdAndDelete(post.comments[i].toString());
            }
            //delete the post from category
            for (let i = 0; i < post.categorys.length; i++) {
                const category = await categoryModel.findById(post.categorys[i].toString());
                category.posts.pull(post._id.toString());
                await category.save();
            }
            //delete the post
            await postModel.findByIdAndDelete(req.params.id);
            res.json({ message: "Post deleted" , success: true});
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },

};

module.exports = postController;
