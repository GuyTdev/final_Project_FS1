import express from "express";
import * as moviesBL from '../controllers/moviesBL.js'
const router = express.Router();

router.post('/', moviesBL.createMovie);
router.get('/:id', moviesBL.getMovie);
router.patch('/:id', moviesBL.updateMovie);
router.delete('/:id', moviesBL.deleteMovie);