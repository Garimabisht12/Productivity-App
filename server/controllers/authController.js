const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signupUser = async(req, res ) =>{
    const {username, email, password} = req.body
    try{
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'user exist'});

        const hashedPass = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashedPass
        });

        await user.save();
        res.status(201).json({message: 'registered', username})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'error registering: ', error: err.message});
    }

}



exports.loginUser = async(req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'Not Found'})
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({message: 'wrong pass'});
        if(password !== user.password) return res.status(400).json({message: 'wrong pass'});
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '5hr'});
        const username = user.username;
        res.status(200).json({message: 'logged in', token, username})

    } catch(err){
        res.status(500).json({message:'error', error: err.message})
    }
}