const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    //TODO replace with actual view
    res.render('register', {  //view + options
        title: 'Register Page'
    });
});

authController.post('/register',
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('username').isAlphanumeric().withMessage('Username should contain only english letters and digits'),
    body('password').isAlphanumeric().withMessage('Username should contain only english letters and digits'),

    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            // console.log(req.body);
            if (req.body.username == '' || req.body.password == '') {
                throw new Error('All fields are required');
            }
            if (req.body.password.length < 5) {
                throw new Error('Password should be at least 5 characters long');
            }
            if (req.body.password !== req.body.repass) {
                throw new Error('Passwords do not match');
            }

            const token = await register(req.body.username, req.body.password);
            res.cookie('token', token);
            res.redirect('/'); //TODO check asignment routing
        } catch (error) {
            // console.log(error);              // reveal if needed
            const errors = parseError(error); //split error
            //TODO add actual error display
            res.render('register', {  // render page + error
                title: 'Register Page',
                errors,
                body: {
                    username: req.body.username
                }
            });
        }

    });

authController.get('/login', (req, res) => {  // render view 
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => { // send req to db
    try {
        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //TODO check with asignment routing
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login',
            errors,
            body: {
                username: req.body.username
            }
        });
    };
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = authController;