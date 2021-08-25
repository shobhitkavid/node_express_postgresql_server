const jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const config = require("../config/config");

const generate = function (payload, expiration = null) {
    return jwt.sign(payload, process.env.JWT_SECRET || config.SECRET,
        // { expiresIn: expiration || process.env.RESET_TOKEN_EXPIRATION }
    );
}
module.exports = class UserService {

    constructor() {
    }

    /**
     * 
     * @param {Object} req 
     * login
     *  @throws {Error}
     */
    async login(req) {

        if (!req.body.email) {
            throw new Error("Email not received!");
        }

        if (!req.body.password) {
            throw new Error("Password not received!");
        }

        const userDetails = await userModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userDetails) {
            throw new Error('User with this email not found!');
        }

        let userPasswordMatched = await userDetails.comparePassword(req.body.password);

        if (!userPasswordMatched) {
            throw new Error("Password not matched!");
        } else {
            return {
                token: generate({ info: userDetails.email }),
                userDetails: {
                    email: userDetails.email,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    createdat: userDetails.createdat,
                    updatedat: userDetails.updatedat
                }
            };
        }

    }

    /**
     * 
     * allUsers
     * @throws {Error}
     */
    async allUsers() {
        const users = await userModel.findAll();

        if (!users) {
            throw new Error('Users not found!');
        }
        return users
    }


    /**
     * 
     * @param {Object} req 
     * register
     * @throws {Error}
     */
    async register(req) {

        if (!req.body.email) {
            throw new Error("Email not received!");
        }

        if (!req.body.password) {
            throw new Error("Password not received!");
        }

        const userDetails = await userModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (userDetails) {
            throw new Error('User with this email already exists!');
        }

        let token = jwt.sign({ info: req.body.email.toLowerCase() },
            config.SECRET
        );

        let createObject = {
            firstname: req.body.firstname.toLowerCase(),
            lastname: req.body.lastname.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password,
        };

        // save the user details in the database
        const registeredUser = await userModel.create(createObject);

        return {
            registeredUser,
            token: token
        };

    }

}
