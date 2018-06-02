let express = require('express');
let router = express.Router();
let User = require('../models/user');
const UNAUTHENTICATED_MESSAGE =  "You must be logged in to complete this action"

router.post('/follow', (req, res) => {

    // Follow a new user

    
    let userToFollow = req.body.user_to_follow
    User.follow(req.user._id, userToFollow , (err, user) => {
        if(!user || err) {
            res.status(500).send("Unable to follow")
        }
        else {
            res.send("Followed");
        }
    });
})


module.exports = router
