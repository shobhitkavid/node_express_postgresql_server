'use strict';
const UserService = require('../services/users.service');

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

const login = async (req, res) => {
    try {
        const Service = new UserService;

        let response = await Service.login(req);
        return _respond([null, response], res, "Login successfull!");
    }
    catch (error) {
        return _respond([error], res, "user controller >> login method", 404);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const Service = new UserService;

        let response = await Service.allUsers(req);
        return _respond([null, response], res, "All users!");
    }
    catch (error) {
        return _respond([error], res, "user controller >> getAllUsers method");
    }
}

const create = async (req, res) => {
    try {
        const Service = new UserService;

        let response = await Service.register(req);
        return _respond([null, response], res, "User account created!", 201);
    }
    catch (error) {
        return _respond([error], res, "user controller >> register method");
    }
}

module.exports = {
    login,
    getAllUsers,
    create
}
