import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js'

const router = Router()

router.get('/',getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id',  authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)

export default router