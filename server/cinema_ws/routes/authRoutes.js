import express from 'express'
import * as authController from '../controllers/authController.js'
const router = express.Router()


router.post('/login', authController.login)
router.post('/create_account', authController.updatePassword)


export default router