const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = 'YourJWTSecretKey';

router.get('/register', (req, res) => {
    res.render('auth/register', { messages: req.flash() });
});

router.post('/register', async (req, res) => {
    console.log('register form body: ', req.body);
    // Validation checks
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        req.flash('error', 'One or more fields are empty.');
        return res.redirect('/register');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        req.flash('error', 'Invalid email format.');
        return res.redirect('/register');
    }
    try {
        // Check if the email already exists in the database
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            req.flash('error', 'Email already exists. Please use a different email.');
            return res.redirect('/register');
        }
        let newUser = new User(req.body);
        await newUser.save();
        req.flash('success', 'Registration successful. Please login.');
        res.redirect('/login');
    } catch (error) {
        req.flash('error', 'There was an error saving the user.');
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login', { messages: req.flash() });
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'User not found. Please register.');
            return res.redirect('/register');
        }
        if (user.password !== password) {
            req.flash('error', 'Incorrect password.');
            return res.redirect('/login');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        req.session.user = user;
        return res.redirect('/');
    } catch (error) {
        console.error('Error logging in user:', error);
        req.flash('error', 'An error occurred. Please try again.');
        return res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid', {path: '/login'});
        res.redirect('/login');
    });
});

module.exports = router;