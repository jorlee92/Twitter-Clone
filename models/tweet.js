let mongoose = require('mongoose');
let User = require('./user');
let Schema = mongoose.Schema;

let TweetSchema = new Schema({

    text: String,
    created: Date,
    updated: Date,
    tags: [String],
    creator: { type: Schema.Types.ObjectId, ref: 'User' },

})



let Tweet = mongoose.model('Tweet', TweetSchema)
module.exports = Tweet;