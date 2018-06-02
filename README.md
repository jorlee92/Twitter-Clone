# Twitter-Clone by jorlee92
Node.JS and MongoDB based twitter clone

# Installation

1. Use git to clone the repo locally
2. From the folder you placed the files in run the command 'npm install', this will install the dependencies the project needs
3. Create a .env file in the root folder, in that you will need to define GOOGLE_CLIENT_SECRET and GOOGLE_CLIENT_ID, both of these
can be obtained by requesting a new API key from Google, [See Here](https://developers.google.com/identity/protocols/OAuth2)
4. You will also need to define MONGODB_URL in your .env file, and connect to a MongoDB server, the easiest route is likely installing MongoDB
locally and defining it as "mongodb://localhost:27017/<Anything you like>"
5. After that you should be able to start the server by running "node app.js" from the root folder.


# API
GET /tweets/ - Shows all of the logged in user's most recent tweets

POST /tweets/ - Creates a new post as the logged in user, you need to have the body of the request contain "tweet_text", the hashtags will 
be grabbed from that same text. 

GET /tweets/feed - Shows the most recent tweets by user's the logged in user is following. 

GET /tweets/tag/<Anything> - Allows you to search all tweets for a provided hashtag (In this case Anything)

GET /tweets/<UserID> - Allows you to see tweets by a particular user 

POST /users/follow - Adds the provided user to the list of user's followed by the logged in user, the request body should have "user_to_follow"
and "user_to_follow" needs to be an ObjectID

GET /auth/google - Allows the user to sign in using Google Oauth2
