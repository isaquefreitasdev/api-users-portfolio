require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const User = require("../models/Users");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const usersFinder = async (req, res) => {
    const clientes = await User.find();
    return res.json({ clientes });
}
const admin = async(req,res)=>{
    const clientes = await User.find();

    return res.json({ clientes });

}
const registerUsers = async (req, res) => {
    const { name, email,telefone, password } = req.body;
    if (name === "" || email === "" || telefone === "" || password === "") {
        return res.status(400).json({
            error: "Preencha todos os campos"
        })
    }
    try {
        const finderEmail = await User.findOne({ email: req.body.email })
        if (finderEmail) {
            return res.status(400).json({
                error: "Email existente.Logue para acessar"
            })
        }
        const adminDomain = 'adm.com'; // Substitua pelo domínio específico dos administradores
        const isAdmin = email.split('@')[1] === adminDomain;
        const user = new User({
            name: name,
            email: email,
            telefone:telefone,
            password: bcrypt.hashSync(password),
            admin:isAdmin
        })

        const doc = await user.save()
        res.status(201).json({
            msg: "User criado"
        })
    } catch (error) {
        return res.status(500).json({
            error: error.errmsg
        })
    }


}
const updateUser = async (req, res) => {
    try {
        const update = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                email: req.body.email,
                telefone: req.body.telefone
            },
            { new: true } // Retorna o documento atualizado
        );

        // Se o usuário não for encontrado, retorna um erro 404
        if (!update) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }

        // Retorna o usuário atualizado com sucesso
        return res.status(200).json({ update });
    } catch (error) {
        // Captura qualquer erro e retorna erro 500
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({error});
    }
};


const deleteUser = async (req, res) => {
    const del = await User.findOneAndDelete({ _id: req.params.id });
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

        if (!user.password) {
            return res.status(401).json({ error: "Credenciais incorretas" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciais incorretas" });
        }

        const isAdmin = (email === 'isaque@admin.com'); // Verifica se o email é o email de admin
        const token = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: isAdmin },
            process.env.SECRET,
            { expiresIn: '2h' }
        );

        res.header("authorization-token", token);
        res.header("headerEmail",email)
        return res.status(200).json({ success: "Usuário logado com sucesso!", token, tokenIsvalid: true,email:email });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};



module.exports = { loginUser, registerUsers, updateUser, deleteUser, usersFinder,admin }