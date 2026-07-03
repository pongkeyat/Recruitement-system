import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from "../config/db.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

export const registerUser = async (req, res) => {
    const { email, password, role } = req.body;

    // 1. Check if all fields are provided
    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    // 2. Validate password strength (Requires at least one number and one special character)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            error: 'Password must contain at least one number and one special character' 
        });
    }

    try {
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userExist.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, role]
        );

        const token = generateToken(newUser.rows[0].id);

        res.cookie('token', token, cookieOptions);
        return res.status(201).json({ user: newUser.rows[0] });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validation (Safe outside try-catch)
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // 2. Fetch user from database
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const userData = user.rows[0];
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

    
        const token = generateToken(userData.id || userData.email);

        // 5. Send cookie and response
        res.cookie('token', token, cookieOptions);
        
        return res.status(200).json({ 
            user: {
                email: userData.email, 
                role: userData.role
            }
        });

    } catch (error) {

        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserProfile = async (req,res) => {
    res.json({user: req.user});
}

export const logoutUser = async (req, res) => {
    res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    res.json({message: 'Logged out successfully'});
}
