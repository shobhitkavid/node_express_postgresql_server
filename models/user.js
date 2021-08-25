'use strict';
const bcrypt = require('bcrypt');
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  // createdat: DataTypes.DATE,
  // updatedat: DataTypes.DATE,
});

User.associate = function (models) {
  // associations can be defined here
};

User.beforeSave((user, options) => {
  if (user.changed('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    // Store hash in your password DB.
    user.password = hash;
  }

});

User.prototype.comparePassword = async function (password) {
  const passwordsMatch = await bcrypt.compare(password, this.password);
  if (passwordsMatch) {
    return true
  } else {
    throw new Error('Invalid password!')
  }
};

module.exports = User;
