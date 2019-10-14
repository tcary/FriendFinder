// DEPENDENCIES 
var friends = require("../data/friends.js");
var path = require("path");
var fs = require("fs");

// API ROUTES 
module.exports = function (app) {

    // ---- Get a json list of all available friends ----
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // ---- POST request used for survey ----
    app.post("/api/friends", function (req, res) {
        console.log("this will do stuff");
        var friendInput = req.body; // stores input from user survey
        res.json(true);
        console.log("\nName: " + friendInput.name + "\nPhoto: " +
            friendInput.photo + "\nScores: " + friendInput.answers);

        friendInput.answers = friendInput.answers.split(",");
        friends.push(friendInput);
        convertAnswers(friendInput);
        // console.log(friendInput.answers);
        compareFriends(friends, friendInput);
        // console.log(friendInput);
    });
}

// Constructor function for builiding friend objects using the
// name, photo link, and an array of the answers
function NewFriend(name, photo, answers) {
    this.name = name;
    this.photo = photo;
    this.answers = answers;
}
NewFriend();

// Function to change formate of survey answers because they come in as strings
function convertAnswers(currentFriend) {
    // variable to hold the current friend
    var current = currentFriend;
    // console.log(current);

    var curAnswers = current.answers; // holds answers

    // converts answers from strings to numbers
    for (i = 0; i < curAnswers.length; i++) {
        curAnswers[i] = parseInt(curAnswers[i]);
    }
} // END convertAnswers()

// Comparison function to compare the current friend's answers to those
// of other friends in the list
function compareFriends(allFriends, currentFriend) {
    var curFriend = currentFriend.answers;
    var matchFriend;
    var matchScores = [];
    var matchScore = 0;
    var closestMatch;

    for (i = 0; i < friends.length - 1; i++) {
        matchFriend = friends[i].answers;
        // console.log(matchFriend);

        // for each answer in an array...
        for (j = 0; j < matchFriend.length; j++) {
            var qScore = Math.abs(curFriend[j] - matchFriend[j]);
            // the total match score is equal to the sum of all qScores
            matchScore += qScore;
        }
        // console.log(matchScore)
        // push friends matchScore into an array
        matchScores.push(matchScore);
        matchScore = 0; // reset back to zero
    }
    // console.log(matchScores)

    // Find lowest score
    var lowestScore = Math.min(...matchScores);
    // console.log(lowestScore);

    // find the index of the lowest score
    var matchIndex = matchScores.indexOf(lowestScore);
    // console.log(matchIndex);
    // find the friend at this index in the allFriends array
    var bestFriend = friends[matchIndex];

    // add a new property to the current friend's object that holds the best match
    currentFriend.bestie = bestFriend;
    // console.log(currentFriend);
}