const express = require("express");
const { NoteModel } = require("../model/model.note");
const jwt = require('jsonwebtoken');
const {authenticate}=require("../Middleware/Authenticate.middleware")

const noteroute = express.Router();

noteroute.get("/", async (req, res) => {
    let { token } = req.headers;
    try {
        jwt.verify(token, 'shhhhh', async function (err, decoded) {
            if (decoded) {
                let notes = await NoteModel.find({ user: decoded.userid })
                res.send(notes)
            }
            else {
                res.send({ "msg": "Login Again" })
            }
        });
    }
    catch (error) {
        res.send({ "msg": error })
    }
})


noteroute.post("/create", async (req, res) => {
    let { token } = req.headers;
    try {
        jwt.verify(token, 'shhhhh', async function (err, decoded) {
            if (decoded) {
                req.body.user = decoded.userid
                let note = new NoteModel(req.body);
                await note.save();
                res.send("Note Created")
            }
            else {
                res.send({ "msg": "Login Again" })
            }
        });
    }
    catch (error) {
        res.send({ "msg": error })
    }
})

noteroute.delete("/delete/:_id",authenticate, async (req, res) => {
    try {
        await NoteModel.findByIdAndDelete(req.params);
        res.send({ "msg": "Note Deleted" })
    }
    catch (error) {
        res.send({ "msg": error })
    }
})

module.exports = { noteroute }