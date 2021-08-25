'use strict';
const WeatherService = require('../services/weather.service');

let _respond = ([err, list], res, message = '', STATUS_CODE = 200) => {
    if (err) {
        return res.status(STATUS_CODE).send({
            success: false,
            message: err.message
        });
    }

    return res.status(STATUS_CODE).send({
        success: true,
        payload: list,
        message
    });
}

const getWeatherDetails = async (req, res) => {
    try {
        const Service = new WeatherService;

        let responseFromDb = await Service.getWeatherDetailsFromDb(req);
        if (responseFromDb) {
            return _respond([null, responseFromDb], res, "Weather details!");
        } else {
            let responseFromApi = await Service.getWeatherFromAPI(req.query.city, req.query.date);
            return res.status(200).send({
                success: true,
                payload: responseFromApi.data,
                message: "Weather details!"
            });
        }
    }
    catch (error) {
        return _respond([error], res, "weather controller >> getWeatherDetails method");
    }
}


module.exports = {
    getWeatherDetails,
}
