const bcrypt = require('bcryptjs');
const Employee = require('../models/Employes');
const jwt = require('jsonwebtoken');

// Listar funcionários
const listEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json({ employees });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
};

// Cadastrar funcionário
const registerEmployee = async (req, res) => {
    const { name, email, telefone, password, position} = req.body;
    
    if (!name || !email || !telefone || !password || !position) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        const emailExists = await Employee.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email já registrado' });
        }

        const employee = new Employee({
            name:name,
            email:email,
            telefone:telefone,
            password: bcrypt.hashSync(password),
            position:position,
            
        });

        await employee.save();
        return res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error});
    }
};

// Atualizar dados do funcionário
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const {name,email, position, telefone } = req.body;

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: id },
            {name,email, position, telefone },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        return res.status(200).json({ message: 'Dados atualizados com sucesso', updatedEmployee });
    } catch (error) {
        return res.status(500).json({error});
        
    }
};

// Deletar funcionário
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        return res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar funcionário' });
    }
};

// Login de funcionário
const loginEmployee = async (req, res) => {
    const {email,password } = req.body;

    try {
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
        }

        const token = jwt.sign(
            { _id: employee._id, },
            process.env.SECRET,
            { expiresIn: '2h' }
        );

        res.header('authorization-token', token);
        return res.status(200).json({ message: 'Funcionário logado com sucesso!', token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao fazer login' });
    }
};

module.exports = {
    listEmployees,
    registerEmployee,
    updateEmployee,
    deleteEmployee,
    loginEmployee
};
