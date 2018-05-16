var newGameNumber = "";
var newWLD = "";
var newRankDiff = "";
var newRank;
var newStreak = "";
var newMap = "";
var User = "EmoMatt91"

getGames(User);


$("#add-game-btn").on("click", function (event) {
  event.preventDefault();

  var newRank = $("#SR-input").val().trim();
  var newMap = $("#map-input").val().trim();

  var newGame = {
    gameNumber: newGameNumber,
    WLD: newWLD,
    rankDiff: newRankDiff,
    rank: newRank,
    streak: newStreak,
    map: newMap,
  };

  console.log(newGame);

  $("#SR-input").val("");
  $("#map-input").val("");


  $("#season-table > tbody").append("<tr><td>" + newGameNumber + "</td><td>" + newWLD + "</td><td>" + newRankDiff + "</td><td>" + newRank + "</td><td>" + newStreak + "</td><td>" + newMap + "</td></tr>");
});

function getGames(User) {
  UserId = User || "";
  if (UserId) {
    UserId = "/?User_id=" + UserId;
  }
  console.log(UserId);
  $.get("/api/games" + UserId, function (data) {
    console.log("Games", data);
    games = data;
    buildTable(games);
  })
}

function buildTable(games) {
  console.log(games[0].Rank);
  for (i = 0; i < games.length; i++) {
    var row = $("<tr><td>" + games[i].SeasonGameNumber + "</td><td>" + "newWLD" + "</td><td>" + "newRankDiff" + "</td><td>" + games[i].Rank + "</td><td>" + "newStreak" + "</td><td>" + games[i].Map + "</td></tr>");
    $("#season-table > tbody").append(row);
  };
}











//I HAVE NO IDEA WHERE THIS IS GONNA GO

// var BnetStrategy = require('passport-bnet').Strategy;
// var BNET_ID = process.env.BNET_ID
// var BNET_SECRET = process.env.BNET_SECRET

// // Use the BnetStrategy within Passport.
// passport.use(new BnetStrategy({
//     clientID: BNET_ID,
//     clientSecret: BNET_SECRET,
//     callbackURL: "https://localhost:3000/auth/bnet/callback"
// }, function(accessToken, refreshToken, profile, done) {
//     return done(null, profile);
// }));
// app.get('/auth/bnet',
//     passport.authenticate('bnet'));

// app.get('/auth/bnet/callback',
//     passport.authenticate('bnet', { failureRedirect: '/' }),
//     function(req, res){
//         res.redirect('/');
//     });