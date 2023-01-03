const categoryModel = require('../models/category.model.js');
const postModel = require('../models/post.model.js');
const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await categoryModel.find().populate('posts');
            res.json({ data: categories, success: true });
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const category = await categoryModel.findById(req.params.id).populate('posts');
            res.json({ data: category, success: true });
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await categoryModel.create({
                name: name,
            });
            res.json({ message: "Category created", success: true });
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await categoryModel.findByIdAndUpdate(req.params.id, {
                name: name,
            });
            res.json({ message: "Category updated" , success: true});
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    },
    deleteCategory: async (req, res) => {
        try {
            //delete all categorys of the post
            const category = await categoryModel.findById(req.params.id);
            for (let i = 0; i < category.posts.length; i++) {
                const post = await postModel.findById(category.posts[i].toString());
                post.categorys.pull(category._id.toString());
                await post.save();
            }
            await categoryModel.findByIdAndDelete(req.params.id);
            res.json({ message: "Category deleted" , success: true});
        } catch (err) {
            res.status(500).json({ message: "Error" , success: false});
        }
    }

};

module.exports = categoryController;