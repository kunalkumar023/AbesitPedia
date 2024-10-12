import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authentication = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login first.'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token.split(" ")[1], process.env.KEY); // Assuming Bearer <token>

        // Find the user by ID
        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token or user not found.'
            });
        }

        next(); // Proceed to the next middleware if token is valid
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized or invalid token.'
        });
    }
};
