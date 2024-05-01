const express = require("express");
const app = express();
const mongoose = require('mongoose');

const User = require("../models/Users");


const usersFinder = async (req, res) => {
    const users = await User.find();
    res.json({ users });
}
const addUsers = async (req, res) => {
    const name = req.body.name
    const email = req.body.email;
    const message = req.body.message;

    try {
        if (name === '' || email === "" || message === '') {
            res.json({ error: "Preencha todos os campos" })
        } else {
            const user = new User({
                nome: name,
                email: email,
                mensagem: message,
            });
            let doc = await user.save();
            res.json({ user })


        }
    } catch (error) {
        res.json({ error: error })
    }
}
const updateUser = async (req, res) => {
    const emailS = req.params.emailS;
    const update = await User.findOneAndUpdate({ email: emailS }, { name: req.body.name, email: req.body.email,message:req.body.message}, { new: true })
    res.json({ update })
}

module.exports = { usersFinder, addUsers, updateUser };
