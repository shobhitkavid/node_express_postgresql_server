'use strict';
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Weather = sequelize.define("Weathers", {
    city: DataTypes.STRING,
    date: DataTypes.DATE,
    weatherdetails: DataTypes.JSON,
});

Weather.associate = function (models) {
    // associations can be defined here
};

module.exports = Weather;
