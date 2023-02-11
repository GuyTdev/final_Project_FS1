import express from 'express'
import * as usersBL from '../controllers/usersBL.js'

const router = express.Router()

//this route is used only for initialize db with sys admin
router.post('/create_admin', usersBL.createAdmin)

router.get('/', usersBL.getUsers)
router.get('/:id', usersBL.getUser)
router.post('/', usersBL.createUser)
router.patch('/:id', usersBL.updateUser)
router.delete('/:id', usersBL.deleteUser)


export default router