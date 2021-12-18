import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, deleteUser, registerUser, updateUserProfile, getUsers, getUserById } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id')
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser)
    .put(protect, admin, getUserById)

export default router;