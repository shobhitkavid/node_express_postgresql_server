const { Router } = require('express');
const {
    create,
    getAllUsers,
    login
} = require('../controllers/users');

const router = Router();
const { checkToken } = require('../middlewares/authMiddleware');

router.get('/', checkToken, getAllUsers);
router.post('/', create);
router.post('/login', login);

module.exports = router
