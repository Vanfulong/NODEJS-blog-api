const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

const userController = {
    getUsers: async (req, res) => {
        const users = await userModel.find();
        res.json(users);
    },
    getUserById: async (req, res) => {
        const user = await userModel.findById(req.params.id);
        res.json(user);
    },
    register: async (req, res) => {
        const { username, password, firstname, lastname, email} = req.body;
        const user = await userModel.findOne({
            username: username
        });
        if (user) {
            res.status(500).json({message: "Username is already exist", success: false})
        } else {
            try{

                await userModel.create({
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    username: username,
                    password: password
                });
                res.json({message: "Register successfully", success: true})
            }catch(err){
                res.status(500).json({message: err, success: false});
            }
        }
    },
    login: async (req, res) => {
        try{
            const { username, password } = req.body;
            const user = await userModel.findOne({
                username: username
            }).select('+password');
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: 86400 // 24 hours
                    });
                    res.cookie('token',token,{
                        httpOnly: true,
                        secure: true,
                        exprites: new Date(Date.now() + 86400)
                    }).json({message: "Login successfully", success: true});
                } else {
                    res.status(500).json({message: "Password is incorrect", success: false});
                }
            } else {
                res.status(500).json({message: "Username is incorrect", success: false});
            } 
        }catch(err){
            res.status(500).json({message: err, success: false});
        }
    },
    logout: async (req, res) => {
        try{
            res.cookie('token', 'none',
                {
                    expires: new Date(Date.now() + 10 * 1000),
                    httpOnly: true
                }).json({message: "Logout successfully", success: true});
        }catch(err){
            res.status(500).json({message: err, success: false});
        }
    }

}

module.exports = userController;