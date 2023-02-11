import mongoose from 'mongoose';

import Movie from '../models/Movie.js'


export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMovie = async (req, res) => {
    try {
        console.log(req.body);
    const obj = req.body;

    const newMovie = new Movie(obj)

        await newMovie.save();

        res.status(201).json(newMovie );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMovie = async (req, res) => {
    try {

        const { id } = req.params;
        const updatedMovie = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

        // const updatedMovie = {  name, genres, image,  premiered, _id: id };

        const resp = await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });

        res.json.status(204).json({ message: `updated successfully ` });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteMovie = async (req, res) => {
    try{
        const { id } = req.params;

        // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

        const resp = await Movie.findByIdAndRemove(id);
        if(resp){
            res.status(202).json({message: `Movie with id :${resp._id} deleted successfully`} );
        }else{
            res.status(404).send({ message:`No Movie with id: ${id}`})

        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


