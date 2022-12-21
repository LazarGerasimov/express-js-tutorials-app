const homeController = require('express').Router();

//TODO replace with assignment
homeController.get('/', (req, res) => {

    if (req.user) {
        res.render('user-home', {
            title: 'User-Home',
            user: req.user
        });
    } else {
        res.render('guest-home', {
            title: 'Guest Home',

        })
    }
    
})

module.exports = homeController;