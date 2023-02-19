const express = require("express");
const { UserModel } = require("../model/model.user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userroute = express.Router();

userroute.post("/register", async (req, res) => {
    let { name, email, pass } = req.body;
    let abc = await UserModel.find({ email: email });

    try {
        if (abc.length > 0) {
            res.send({ "msg": "You are already registered" })
        }
        else {
            bcrypt.hash(pass, 2, async function (err, hash) {
                if (err) {
                    res.send({ "msg": err })
                }
                else {
                    let user = new UserModel({ name: name, email: email, pass: hash });
                    await user.save();
                    res.send({ "msg": "You are successfully registered" })
                }
            });
        }
    }
    catch (error) {
        res.send({ "msg": error })
    }
})

userroute.post("/login", async (req, res) => {
    let { email, pass } = req.body;
    let abc = await UserModel.find({ email: email });

    try {
        if(abc.length>0){
            bcrypt.compare(pass, abc[0].pass, function(err, result) {
                if(result){
                    let token = jwt.sign({userid:abc[0]._id}, 'shhhhh');
                    res.send({"msg":"Successfully Logged In","token":token})
                }
                else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
        }
        else{
            res.send({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        res.send({ "msg": error })
    }
})

module.exports = { userroute }