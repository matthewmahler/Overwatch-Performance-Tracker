var newGameNumber = "";
var newWLD = "";
var newRankDiff = "";
var newRank;
var newWinStreak = 0;
var newLossStreak = 0;
var newMap = "";
var Gamertag = 1;
var Season;
var games;
var gameNumberArray = [];
var RankArray = [];


getGames(Gamertag);


$("#add-game-btn").on("click", function (event) {
  event.preventDefault();

  var newRank = $("#SR-input").val().trim();
  var newMap = $("#map-input").val().trim();


  var dbGame = {
    AccountGameNumber: games[games.length - 1].AccountGameNumber + 1,
    IfPlacementWLD: "",
    Map: newMap,
    PlacementMatch: false,
    Rank: newRank,
    SeasonGameNumber: games[games.length - 1].SeasonGameNumber + 1,
    SeasonNumber: 10,
    UserUuid: "EmoMatt91",
    createdAt: "",
    id: games[games.length - 1].id + 1,
    updatedAt: ""
  }
  console.log(dbGame)
  newGameNumber = games[games.length - 1].SeasonGameNumber + 1;
  newRankDiff = newRank - games[games.length - 1].Rank;


  if (newRankDiff > 0) {
    newWLD = "W";
  } else if (newRankDiff < 0) {
    newWLD = "L";
  } else {
    newWLD = "D";
  }

  if (newWLD === "W") {
    newWinStreak = newWinStreak + 1;
    newLossStreak = 0;
  } else if (newWLD === "L") {
    newLossStreak = newLossStreak + 1;
    newWinStreak = 0;
  } else if (newWLD === "D") {
    newLossStreak = 0;
    newWinStreak = 0;
  }

  $("#SR-input").val("");
  $("#map-input").val("");


  $("#season-table > tbody").append("<tr><td>" + newGameNumber + "</td><td>" + newWLD + "</td><td>" + newRankDiff + "</td><td>" + newRank + "</td><td>" + newWinStreak + "/" + newLossStreak + "</td><td>" + newMap + "</td></tr>");

  games.push(dbGame);
  $.ajax("/api/games/", {
    type: "POST",
    data: dbGame
  }).then(
    function() {
      console.log("new game added");
      // Reload the page to get the updated list
    }
  );
});

function getGames(Gamertag) {
  GamertagId = Gamertag || "";
  if (GamertagId) {
    GamertagId = "/?Gamertag_id=" + Gamertag;
  }

  $.get("/api/games" + GamertagId, function (data) {
    console.log("Games", data);
    games = data;
    buildTable(games);
    repackageData(games);
    buildGraph();
  })
}

function buildTable(games) {
  for (i = 0; i < games.length; i++) {
    var newRankDiff;
    var newWLD;

    if (!games[i].PlacementMatch) {
      newRankDiff = games[i].Rank - games[i - 1].Rank;
    } else {
      newRankDiff = games[i].SeasonGameNumber + "/10";
    }

    if (!games[i].PlacementMatch) {
      if (newRankDiff > 0) {
        newWLD = "W";
      } else if (newRankDiff < 0) {
        newWLD = "L";
      } else {
        newWLD = "D";
      }
    } else if (games[i].PlacementMatch) {
      newWLD = games[i].IfPlacementWLD;
    }

    if (!games[i].PlacementMatch) {
      if (newWLD === "W") {
        newWinStreak = newWinStreak + 1;
        newLossStreak = 0;
      } else if (newWLD === "L") {
        newLossStreak = newLossStreak + 1;
        newWinStreak = 0;
      } else if (newWLD === "D") {
        newLossStreak = 0;
        newWinStreak = 0;
      }
    } else {
      newWinStreak = ""
      newLossStreak = ""
    }

    var row = $("<tr><td>" + games[i].SeasonGameNumber + "</td><td>" + newWLD + "</td><td>" + newRankDiff + "</td><td>" + games[i].Rank + "</td><td>" + newWinStreak + "/" + newLossStreak + "</td><td>" + games[i].Map + "</td></tr>");
    $("#season-table > tbody").append(row);

    $("#season-div").scrollTop($("#season-div")[0].scrollHeight);
  };
}

function repackageData(games) {
  for (i = 0; i < games.length; i++) {
    var tempGameNumber = games[i].SeasonGameNumber
    var tempRank = games[i].Rank
    gameNumberArray.push(tempGameNumber)
    RankArray.push(tempRank)
  }
}


function buildGraph() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: gameNumberArray,
      datasets: [{
        label: Gamertag,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: RankArray,
      }]
    }

    
    
  });
}







