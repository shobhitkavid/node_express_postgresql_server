const axios = require("axios");
const config = require("../config/config");
const weatherModel = require("../models/weather");

module.exports = class WeatherService {

  constructor() {
  }

  /**
   * Method to get weather details from weatherapi
   * getWeatherFromAPI
   * @throws {Error}
   */
  async getWeatherFromAPI(city, date) {
    let response = await axios({
      method: 'get',
      url: `http://api.weatherapi.com/v1/current.json?key=${config.WEATHERAPI_KEY}&q=${city}&dt=${date}&aqi=no`
    })
    if (response) {
      let createObject = {
        city: city.toLowerCase(),
        date: date,
        weatherdetails: response.data
      };
      // save the weather details in the database
      await weatherModel.create(createObject);
      return response
    } else {
      return false
    }
  }


  /**
   * Method to get weather details from local db
   * getWeatherDetailsFromDb
   * @throws {Error}
   */
  async getWeatherDetailsFromDb(req) {
    if (!req.query.city) {
      throw new Error("City not received!");
    }

    if (!req.query.date) {
      throw new Error("Date not received!");
    }

    let weatherDetails = await weatherModel.findOne({
      where: {
        city: req.query.city.toLowerCase(),
        date: new Date(req.query.date)
      },
      raw: true
    });

    if (!weatherDetails) {
      return weatherDetails = '';
    }
    return weatherDetails
  }

}
