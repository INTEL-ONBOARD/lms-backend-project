const User = require('../models/User');

const userROle = require('../enums/userRoles');

exports.createuser = async (req, res) => {
    try {
        const { username, password, email, userRole, isActive, profilePicture, bio } = req.body;

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
            userRole: userRole || userROle.GUEST, // Default to GUEST if not provided
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
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        updates.updatedAt = new Date(); // Update the timestamp

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'User updated  successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if ((!email && !username) || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email or username and password are required.'
            });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [
                email ? { email } : null,
                username ? { username } : null
            ].filter(Boolean)
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Compare password (plain text check for now)
        if (user.password !== password) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                userRole: user.userRole
            }
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};
