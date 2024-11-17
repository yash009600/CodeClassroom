const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

exports.register = async(req, res)=>{
    // console.log("hello")
    const {name, email, password, role} = req.body;
    try {
        // console.log('called')
        let user = await User.findOne({email});
        // console.log(user)
        if(user){
            return res.status(400).json({
                msg : " User already exists"
            });
        }

        user = new User({
            name, 
            email,
            password,
            role
        });
        await user.save();

        const payload = {
            id : user._id,
            role : user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1h'});

        res.status(200).json({
            token
        })

    } catch (error) {
        res.status(500).json({
            msg : 'server error, authController error'
        });
    }
};

exports.login = async(req, res)=>{
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email, password});
        // console.log(user)
        if(!user) {
            return res.status(400).json({
                msg : "Invalid credentials"
            })
        }
        // if(password != user.password) {
        //     res.status(400).json({
        //         msg : "Invalid credentials"
        //     })
        // }
        // console.log(user)
        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log('hhehehehheheheheheheehheh')
        // res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: false });
        // console.log(req.cookies.token)
        // console.log("jugvvuvbuhb")
        // console.log(user.role);
        res.status(200).json({
            token,
            role : user.role,
            id : user._id
        });
    } catch (error) {
        // console.log('error', error)
        res.status(500).json({ message: 'Server error, authController' });
    }
}