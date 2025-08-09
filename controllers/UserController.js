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

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send a success response
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: savedUser
        });

    } catch (error) {
        // Handle errors and send a response
        console.error('Error creating user:', error);
        res.status(error.status || 500).json({
            status: 'error',
            message: 'Internal Server Error',
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
        console.error('Error retrieving users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });

    }
};