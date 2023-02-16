import express from 'express'
import * as usersController from '../controllers/usersController.js'

const router = express.Router()

//this route is used only for initialize db with sys admin
router.post('/create_admin', usersController.createAdmin)

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUser)
router.post('/', usersController.createUser)
router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)


export default router