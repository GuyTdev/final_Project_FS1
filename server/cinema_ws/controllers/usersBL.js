import express from 'express';
import mongoose from 'mongoose';

import User from '../models/User.js'

const router = express.Router();

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        console.log(req.body);
    const obj = req.body;

    const newUser = new User(obj)

        await newUser.save();

        res.status(201).json(newUser );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { username, password } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const updatedUser = {  username, password, _id: id };

        await User.findByIdAndUpdate(id, updatedUser, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        await User.findByIdAndRemove(id);

        res.json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export default router;