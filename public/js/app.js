


$("#add-game-btn").on("click", function(event) {
  event.preventDefault();

  var newRank = $("#SR-input").val().trim();
  var newMap = $("#map-input").val().trim();
  

  var newGame = {
    rank: newRank,
    map: newMap,

  };

  console.log(newGame.rank);
  console.log(newGame.map);



  $("#employee-name-input").val("");
  $("#role-input").val("");

});



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