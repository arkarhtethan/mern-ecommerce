const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, deleteUser, registerUser, updateUserProfile, getUsers, getUserById } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id')
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser)
    .put(protect, admin, getUserById)

module.exports = router;