let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    name: String,
    email: String,
    googleID: String,
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

UserSchema.statics.findOrCreate = function(googleID, familyName, firstName, callback){
    //Determine if the account exists, if not create it.
    this.findOne({googleID: googleID})
    .then((user) => {
        if (!user ){
            // If the result is null create a new user
            this.create({
                name: firstName + " " + familyName,
                email: null, 
                googleID: googleID
            })
            .then((user) => {
                callback(null, user);
            })
        } else if (user) {
            // If the user does exist return it to the callback
            callback(null, user);
        }
    }) 
    .catch((err) => {
        callback(err, null);
    })
} 

UserSchema.statics.follow = function(userAddingID, userToAddID, callback){
    this.findOne({_id : userAddingID})
    .then((user) => {
        user.following.push(userToAddID);
        user.save();
    })
    .then(() => {
        this.findOne({_id : userToAddID})
        .then(user => {
            user.followers.push(userAddingID);
            user.save();
            callback(null, user)
        })
    })
    .catch(error => callback(error, null))

}

let User = mongoose.model('User', UserSchema);
module.exports = User;