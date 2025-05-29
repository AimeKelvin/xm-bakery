import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import Product from '../models/product.model.js'

config()

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const user = await User.create({ fullName, email, password: hashedPassword })
        res.status(201).json({
            message: "You are registered"
        })
    } catch(error) {
        console.log(`Failed to register user ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: {email} })
        const isPasswordMatching = await bcrypt.compare(password, user.password)
        if (!user || !isPasswordMatching) {
            res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });

        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(201).json({
            message: "You are logged in",
            user: user
        })
    } catch(error) {
        console.log(`Failed to register user ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

export const getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            attributes: ['id', 'fullName', 'email'], 
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Failed to fetch user: ${error}`);
        res.status(500).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProducts = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized: No user data' });
        }

        const products = await Product.findAll({
            where: { userId: req.user.userId },
            attributes: ['id', 'productName', 'productDescription', 'productImage', 'productPrice', 'userId'],
        });

        if (!products.length) {
            return res.status(200).json({ message: 'No products found', products: [] });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.error(`Failed to fetch user products: ${error}`);
        res.status(500).json({ error: error.message });
    }
};