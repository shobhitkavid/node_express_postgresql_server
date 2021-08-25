'use strict';
let jwt = require('jsonwebtoken');
const config = require("../config/config");
const userModel = require("../models/user");

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        // if (token.startsWith('Bearer ')) {
        //     // Remove Bearer from string
        //     token = token.slice(7, token.length);
        // }
        jwt.verify(token, config.SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                req.email = decoded.info;
                var userInfo = await userModel.findOne({
                    raw: true,
                    where: {
                        email: req.email
                    }
                });
                if (userInfo) {
                    req.uid = userInfo.id
                    next();
                }
                else {
                    return res.status(401).json({
                        success: false,
                        message: 'Token is not for valid user'
                    });
                }
            }
        });

    }
    else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};


module.exports = {
    checkToken: checkToken
};
