const express = require("express");
const app = express();
const mongoose = require('mongoose');

const User = require("../models/Users");
const validator = require("validator")


const usersFinder = async (req, res) => {
    const users = await User.find();
    res.json({ users });
}
    const registerUsers = async (req, res) => {
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const findEmail =  await User.findOne({email:email})
    if(findEmail){
        res.json({error:"Email existente"})
    }
    try {
        if (name === '' || email === "" || password === '') {
            res.json({ error: "Preencha todos os campos" })
        } else {
            const user = new User({
                name: name,
                email: email,
                password: password,
            });
            let doc = await user.save();
            res.json({ user })


        }
    } catch (error) {
        if (error.errors && error.errors.email && error.errors.email.message) {
            // Se houver uma mensagem de erro para o campo de email, retorne apenas ela
            return res.status(400).json({ error: error.errors.email.message });
        }
        if (error.errors && error.errors.password && error.errors.password.message) {
            return res.status(400).json({ error: "Senha no formato inválido" })
        }


    }
}
const updateUser = async (req, res) => {
    const update = await User.findOneAndUpdate(
        { email: req.params.email },
        {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        },
        { new: true }
    );

    if (update) {
        res.status(201).json({ update });
    } else {
        res.status(404).json({ error: "Usuário não encontrado!!" });
    }
}

const deleteUser = async (req, res) => {
    const del = await User.findOneAndDelete({ email: req.params.email });
    if (!del) {
        res.status(404).json({ res: "Não foi o encontrado o Usuário." })
    }
    res.json({ msg: "User deletado" })
}
module.exports = { usersFinder, registerUsers, updateUser, deleteUser };
