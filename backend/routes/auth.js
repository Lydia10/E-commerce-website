const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async(req, res) => {
    if(!req.body.username){
        return res.status(401).send({message: "Please enter a user name!"});
    }
    if(!req.body.password){
        return res.status(401).send({message: "Please enter a password!"});
    }
    if(!req.body.email){
        return res.status(401).send({message: "Please enter an email address!"});
    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS__SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//login
router.post("/login", async(req, res) => {
    if(!req.body.username){
        return res.status(401).send({message: "Please enter a user name!"});
    }
    if(!req.body.password){
        return res.status(401).send({message: "Please enter a password!"});
    }
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(401).send({message: "This user does not exist!"});
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS__SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password){
            return res.status(401).send({message: "Wrong password! Please try again!"});
        }
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT__SEC, {expiresIn: "3d"});
        
        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;