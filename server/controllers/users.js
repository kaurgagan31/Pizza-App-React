const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

/**
 * User Login
 */

const logIn = (req, res) => {
    User.findOne({
        email: req.body.email,
        is_deleted: 0
    }).exec(function (err, userData) {
        if (err) {
            return res.status(500).json({ status: "102", message: 'Failed to get user' })
        }
        if (!userData) {
            return res.status(500).json({ status: "103", message: 'User doesnot exists' })
        } else if (userData) {
            var token = jwt.sign(userData.toJSON(), process.env.supersecret, {});
            var usr = { id: userData._id, first_name: userData.first_name, last_name: userData.last_name, email: userData.email, gender: userData.gender, jobType: userData.jobType, role_id: userData.role };
            return res.status(200).json({ status: "100", user: usr, token: token });
        }
    })
}

/**save form data */

const saveFormData = async (req, res) => {
    const formValues = JSON.parse(req.body.formValues);
    User.findOne(
        {
            email: req.body.email
        },
        async function (err, userData) {
            if (!userData) {
                const user = new User({
                    _id: new Types.ObjectId(),
                    email: formValues.email,
                    first_name: formValues.firstName,
                    last_name: formValues.lastName,
                    jobType: formValues.jobType,
                    gender: formValues.gender,
                    image: req.file.filename,
                    hobbies: formValues.hobbies,
                    accepted: formValues.acceptedTerms
                })
                try {
                    await user.save()
                    return res.status(200).json({ message: 'Success', status: 200 })
                } catch (err) {
                    return res.status(500).json({ message: 'Failed to save user form data' })
                }
            } else {
                return res.status(422).json({ message: ' This user email already exists' })
            }
        })
}

/**update form data */

const updateFormData = async (req, res) => {
    const formValues = req.body;
    const data = {
        _id: formValues.id,
        email: formValues.email,
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        jobType: formValues.jobType,
        gender: formValues.gender,
    };
    try {
        const user = await User.findById(formValues.id);
        if (!user)
            return res.status(422).json({
                status: '103',
                message: 'User does not exist'
            });
        Object.assign(user, data);
        const userData = await user.save();
        var usr = { id: userData._id, first_name: userData.first_name, last_name: userData.last_name, email: userData.email, gender: userData.gender, jobType: userData.jobType, role_id: userData.role };
        return res.status(200).json({
            status: '100',
            user: usr,
            
        });
    } catch (err) {
        return res.status(500).json({
            status: '102',
            message: 'Failed to update User'
        });
    }
}
/**show User Listing */

const getUserData = async (req, res) => {
    try {
        const userList = await User.find({});
        return res.status(200).json({ status: 200, users: userList });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed get userList'
        });
    }
}

/** Search user by filter */

const searchUser = async (req, res) => {
    try {
        const first_name = req.body.firstName;
        const gender = req.body.gender;
        const hobbies = req.body.hobbies;
        let query = {};

        if (first_name !== '') {
            if (gender && hobbies) {
                query = {
                    $and: [
                        { first_name: first_name },
                        { gender: gender },
                        { hobbies: hobbies }
                    ]
                };
            } else if (gender) {
                query = {
                    $or: [
                        { first_name: first_name },
                        { gender: gender }
                    ]
                };
            } else if (hobbies) {
                query = {
                    $or: [
                        { first_name: first_name },
                        { hobbies: hobbies }
                    ]
                };
            } else {
                query = { first_name: first_name }
            }
        }
        const users = await User.find(query);
        if (users.length !== undefined) {
            return res.status(200).json({ status: 200, users: users })
        } else {
            return res.status(200).json({ status: 201, users: users })
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Failed get userList'
        });
    }
}

module.exports = { logIn, saveFormData, updateFormData, getUserData, searchUser };