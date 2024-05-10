const express = require("express");
const app = express();
const mongoose = require('mongoose');

const User = require("../models/Users");
const validator = require("validator")
const bcrypt = require("bcryptjs")

const usersFinder = async (req, res) => {
    const users = await User.find();
    res.json({ users });
}
const registerUsers = async (req, res) => {
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const findEmail = await User.findOne({ email: email })
    if (findEmail) {
        return res.json({ error: "Email existente" })
    }
    try {
        if (name === '' || email === "" || password === '') {
            return res.json({ error: "Preencha todos os campos" })
        }
            const user = new User({
                name: name,
                email: email,
                password: password,
            });
            user.password = bcrypt.hashSync(password)
            let doc = await user.save();
            
            res.json({ user })


        
    } catch (error) {
        if (error.errors && error.errors.email && error.errors.email.message) {
            // Se houver uma mensagem de erro para o campo de email, retorne apenas ela
            return res.status(400).json({ error: error.errors.email.message });
        }
        if (error.errors && error.errors.password && error.errors.password.message) {
            return res.status(400).json({error})
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
        return res.status(404).json({ res: "Não foi o encontrado o Usuário." })
    }
    res.json({ msg: "User deletado" })
}
const loginUser = async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(401).json({ error: "Credenciais incorretas" });
            }

            // Aqui, em vez de verificar se a senha do usuário é undefined, verificamos se a senha existe.
            if (!user.password) {
                return res.status(401).json({ error: "Credenciais incorretas" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Credenciais incorretas" });
            }

            res.status(200).json({ success: "Usuário logado com sucesso!" });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

module.exports = {loginUser,registerUsers,updateUser,deleteUser,usersFinder}