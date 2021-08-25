const { Router } = require('express');
const {
    getWeatherDetails
} = require('../controllers/weather');

const router = Router();
const { checkToken } = require('../middlewares/authMiddleware');

router.get('/', checkToken, getWeatherDetails);

module.exports = router
