"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.connect(MONGODB_URI, (err, db) => {
        if (err) {
          console.error(`Failed to connect: ${MONGODB_URI}`);
          throw err;
        }

        db.collection('tweets').insertOne(newTweet, function(err, docs) {
          callback(err, true);
        })
        db.close();

      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.connect(MONGODB_URI, (err, db) => {
        if (err) {
          console.error(`Failed to connect: ${MONGODB_URI}`);
          throw err;
        }

        db.collection('tweets').find().toArray(function(err, docs) {
          callback(err, docs.sort(sortNewestFirst));
        })
        db.close();

      });
    }

  };
}
