let express = require('express');
let router = express.Router();
let Tweet = require('../models/tweet');
let User = require('../models/user');
const UNAUTHENTICATED_MESSAGE =  "You must be logged in to complete this action"

router.get('/', (req, res) => {
    // List all of the logged in user's tweets
    if(req.isAuthenticated()){
        Tweet.find({ creator : req.user._id })
        .then((results, errors) => {
            res.send(results);
        })
    } else {
        res.send(UNAUTHENTICATED_MESSAGE);
    }
})

router.post('/', (req, res) => {
    // Create a new tweet
        if(req.isAuthenticated()){
            let text = req.body.tweet_text;
            let created = Date.now();
            let updated = created; 
            let tags = [];
            let creator = req.user._id
            // Grab the hashtags from the text of the post. 
            let grabHashTags = new RegExp('#[A-z]+', 'g'); //Global flag so that it can continue after the first match
            let wordToAdd;
            do {
                wordToAdd = grabHashTags.exec(text);
                if(wordToAdd) {
                    // Notes: The first element of the array will be the word that we are adding
                    // We also need to keep the words lowercase so that we can later search through them
                    // Otherwise we would need to shift cases, or oftentimes just miss out on results. 
                    tags.push(wordToAdd[0].toLowerCase())
                }
            } while (wordToAdd)
            //Create the tweet using the shorthand operator to save a bit of typing. 
            Tweet.create({
                text, created, updated, tags, creator 
            })
            res.send(tags)
        }
        else {
            res.send(UNAUTHENTICATED_MESSAGE)
        }
})

router.get('/feed', (req, res) => {
    // View the most recent tweets from people the logged in user if following.

    //Find tweets created by people you are following, softed by newest first
    // We cant just use req.user.following because if you follow somebody during a session
    // They will not be in the array, so we need to find the user first. 
    if(req.isAuthenticated()){
        User.findById(req.user._id)
        .then((user) => {
            let following = user.following; //Array
            Tweet.find({'creator': following})
            .sort({created: -1})
            .then((result) => {
                res.send(result)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Unable to load your feed")
        })
    } else {
        res.status(401).send(UNAUTHENTICATED_MESSAGE)
    }


})

router.get('/tag/:tag', (req, res) => {
    // Search for tweets with a given tag, note that you must leave out the hashtag.

    let searchTag = String('#' + req.params.tag);
    
    console.log(searchTag);
    Tweet.find({ tags: searchTag })
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        res.send("Unable to complete search");
    })
})

router.get('/:userID', (req, res) => {
    //Find tweets by a specific user

    let userID = req.params.userID;
    Tweet.find({ creator: userID })
    .then((results, errors) => {
        if (!results || errors){
            res.send("Unable to find matching tweets")
            console.log(`Errors when finding tweets for ${ userID } :: ${ errors }`)
        }
        else {
            res.send(results);
        }
    })
    .catch((error) => {
        console.log("Error performing search " + error )
        res.send("Unable to find any results");
    })
})

module.exports = router