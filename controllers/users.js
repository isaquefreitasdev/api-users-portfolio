const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

// Listar usuários
const listClientes = async (req, res) => {
    try {
        const users = await Users.find();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Cadastrar usuário
const registerClient = async (req, res) => {
    const { name, email, telefone, password } = req.body;
    
    if (!name || !email || !telefone || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        const emailExists = await Users.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email já registrado' });
        }

        const user = new Users({
            name: name,
            email: email,
            telefone: telefone,
            password: bcrypt.hashSync(password, 10), // Hash da senha
        });

        await user.save(); // Correção do "save"
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// Atualizar dados do usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, telefone } = req.body;

    try {
        const updatedUser = await Users.findOneAndUpdate(
            { _id: id },
            { name, email, telefone },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Dados atualizados com sucesso', updatedUser });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// Deletar usuário
const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await Users.findOneAndDelete({ _id: id });

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

// Login de usuário
const loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.SECRET,
            { expiresIn: '2h' }
        );

        res.header('authorization-token', token);
        return res.status(200).json({ message: 'Usuário logado com sucesso!', token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao fazer login' });
    }
};

module.exports = {
    listClientes,
    registerClient,
    loginClient,
    updateUser,
    deleteClient
};
