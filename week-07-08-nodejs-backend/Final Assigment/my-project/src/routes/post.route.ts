import { Router } from 'express'
import { getAllPosts, getPostById, createPost, updatePost, deletePost} from '../controllers/post.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.post('/', authenticate, createPost)
router.put('/:id', authenticate, updatePost)
router.delete('/:id', authenticate, deletePost)

export default router