import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 
import pool from "../config/db.js";
// 1. Connect the notification service utilities
import { AccountCreatedEmail } from "./user.email.services.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

// Changed payload key from 'id' to 'email'
const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

export const registerUser = async (req, res) => {
    const { email, role } = req.body;

    if (!email || !role) {
        return res.status(400).json({ error: 'Email and role are required' });
    }

    const allowedRoles = ['hro', 'hrmpsb'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role provided' });
    }

    try {
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userExist.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // --- CUSTOM PARSABLE 12-CHARACTER PASSWORD GENERATOR ---
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()_+~|}{[]:;?><,./-=";
        const allChars = uppercase + lowercase + numbers + specialChars;

        let passwordArray = [];

        passwordArray.push(uppercase[crypto.randomInt(0, uppercase.length)]);
        passwordArray.push(lowercase[crypto.randomInt(0, lowercase.length)]);
        passwordArray.push(numbers[crypto.randomInt(0, numbers.length)]);
        passwordArray.push(specialChars[crypto.randomInt(0, specialChars.length)]);

        for (let i = 0; i < 8; i++) {
            passwordArray.push(allChars[crypto.randomInt(0, allChars.length)]);
        }

        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = crypto.randomInt(0, i + 1);
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }

        const generatedPassword = passwordArray.join('');
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        // Fixed RETURNING clause to use email instead of id
        const newUser = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3::character varying) RETURNING email, role, is_password_changed',
            [email, hashedPassword, role]
        );

        let emailStatus = 'SENT';
        let logMessage = 'DEPED Recruitment System credentials successfully emailed.';

        try {
            await AccountCreatedEmail(email, generatedPassword);
        } catch (mailError) {
            console.error("❌ Mail delivery failed:", mailError);
            emailStatus = 'FAILED';
            logMessage = `Mail delivery failed. Error: ${mailError.message}`;
        }

        // Generate token using email instead of id
        const token = generateToken(newUser.rows[0].email);

        res.cookie('token', token, cookieOptions);
        
        return res.status(201).json({ 
            token,
            user: {
                email: newUser.rows[0].email,
                role: newUser.rows[0].role,
                isPasswordChanged: newUser.rows[0].is_password_changed
            },
            message: emailStatus === 'SENT' 
                ? "User registered successfully and credentials emailed." 
                : "User registered, but welcome email failed to send."
        });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const userData = user.rows[0];
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token using email instead of id
        const token = generateToken(userData.email);

        res.cookie('token', token, cookieOptions);
        
        return res.status(200).json({ 
            token,
            user: {
                email: userData.email, 
                role: userData.role,
                isPasswordChanged: userData.is_password_changed
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Updates the user's password using their email context.
 * Assumes your auth middleware attaches the user data via req.user.email
 */
export const updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const userEmail = req.user?.email; // Gathered from decoded JWT token payload

    if (!userEmail) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    if (!newPassword) {
        return res.status(400).json({ error: 'New password is required' });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ 
            error: 'Password must contain at least one number and one special character' 
        });
    }

    try {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Targeted WHERE update rule changed from id to email
        const updateResult = await pool.query(
            'UPDATE users SET password = $1, is_password_changed = true WHERE email = $2 RETURNING email, is_password_changed',
            [hashedNewPassword, userEmail]
        );

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ error: 'User account not found' });
        }

        return res.status(200).json({ 
            message: "Password changed successfully.",
            isPasswordChanged: updateResult.rows[0].is_password_changed
        });

    } catch (error) {
        console.error('Error during password update:', error);
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