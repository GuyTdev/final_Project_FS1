import express from "express";
import * as usersBL from '../controllers/usersBL.js'
const router = express.Router();

router.post('/', usersBL.createUser);
router.get('/:id', usersBL.getUser);
router.patch('/:id', usersBL.updateUser);
router.delete('/:id', usersBL.deleteUser);