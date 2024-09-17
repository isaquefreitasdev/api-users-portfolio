const Movie = require('../models/Movies');

// Listar filmes
const listMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json({ movies });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};

// Cadastrar filme
const registerMovie = async (req, res) => {
    const { title, description, src } = req.body;

    if (!title || !description || !src) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        const movieExists = await Movie.findOne({ title });
        if (movieExists) {
            return res.status(400).json({ error: 'Filme já registrado' });
        }

        const movie = new Movie({
            title,
            description,
            src
        });

        await movie.save();
        return res.status(201).json({ message: 'Filme cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao cadastrar filme' });
    }
};

// Atualizar dados do filme
const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, description, src } = req.body;

    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: id },
            { title, description, src },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        return res.status(200).json({ message: 'Dados atualizados com sucesso', updatedMovie });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
};

// Deletar filme
const deleteMovies = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMovie = await Movie.findOneAndDelete({ _id: id });

        if (!deletedMovie) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        return res.status(200).json({ message: 'Filme deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar filme' });
    }
};

module.exports = {
    listMovies, 
    registerMovie, 
    updateMovie, 
    deleteMovies
};
