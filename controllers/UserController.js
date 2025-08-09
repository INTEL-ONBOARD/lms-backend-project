const User = require('../models/User');
const express = require('express');



exports.createuser = async (req, res) => {
    try {
        const { username, password, email, userROle, isActive, profilePicture, bio } = req.body;

        if (!username || !password || !email) {
            //throw new Error('Username, password, and email are required.');
            //return res.status(400).json({ message: 'Username, password, and email are required.' });
            throw {
                status: 400,
                message: 'Username, password, and email are required.'
            };
        }

        // Create a new user instance
        const newUser = new User({
            username,
            password,
            email,
            userROle: userROle || 'GUEST', // Default to GUEST if not provided
            isActive: isActive !== undefined ? isActive : true,
            profilePicture: profilePicture || null,
            bio: bio || ''
        });

        newUser.save((err, savedUser) => {
            if (err) {
                throw {
                    status: 500,
                    message: 'Error creating user',
                    error: err.message
                };
            }
            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: savedUser
            });
        });

    } catch (error) {
        // Handle errors and send a response
        res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
            error: error.error || null
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message || 'Internal Server Error'
        });
    }
};