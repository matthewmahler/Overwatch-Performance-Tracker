var newGameNumber = "";
var newWLD = "";
var newRankDiff = "";
var newRank;
var newWinStreak = 0;
var newLossStreak = 0;
var newMap = "";
var Users;
var currentUser;
var currentGamertag;
var currentSeason;
var Gamertags;
var Season;
var games;
var gameNumberArray = [];
var RankArray = [];
var localSeasonData;


$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (UserData) {
    currentUser = UserData.uuid;
    console.log("User", currentUser)
    getGamertags(currentUser)
  });

  $.get("/api/season_data").then(function (SeasonData) {
    localSeasonData = SeasonData;
    console.log("Season", SeasonData)
    createSeasonOptions();
  });


});

function getGamertags(currentUser) {

  UserId = currentUser || "";
  if (UserId) {
    UserId = "/?User_id=" + currentUser;
  }

  $.get("/api/gt_data" + UserId, function (data) {
    Gamertags = data
    console.log("Gamertags", Gamertags);
    createGamertagOptions();
  })

}

$("#get-games").on("click", function (event) {
  event.preventDefault();
  currentGamertag = $("#gt-select").val().trim()
  currentSeason = $("#season-select").val().trim()
  console.log(currentGamertag)
  RankArray = [];
  gameNumberArray = [];
  getGames(currentGamertag, currentSeason);


})

$("#add-game-btn").on("click", function (event) {
  event.preventDefault();

  var newRank = $("#SR-input").val().trim();
  var newMap = $("#map-input").val().trim();


  var dbGame = {
    id: "",
    AccountGameNumber: games[games.length - 1].AccountGameNumber + 1,
    SeasonGameNumber: games[games.length - 1].SeasonGameNumber + 1,
    Rank: newRank,
    Map: newMap,
    PlacementMatch: 0,
    IfPlacementWLD: "",
    createdAt: "",
    updatedAt: "",
    GamertagId: currentGamertag,
    UserUuid: currentUser,
    SeasonNumber: 10
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
    function () {
      console.log("new game added");
      // Reload the page to get the updated list
    }
  );
});

function getGames(currentGamertag, currentSeason) {
  GamertagId = currentGamertag || "";
  if (GamertagId) {
    var GamertagId = "Gamertag_id=" + currentGamertag + "&";
  }

  SeasonId = currentSeason || "";
  if (SeasonId) {
   var SeasonId = "Season_id=" + currentSeason + "&";
  }

  $.get("/api/games/?" + GamertagId + SeasonId, function (data) {
    console.log("Games in Season: " + currentSeason, data);
    games = data;
    
    buildTable(games);
    repackageData(games);
    buildGraph();
  })
}

function buildTable(games) {
  $("#season-table > tbody").empty();
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
        label: Gamertags[currentGamertag - 1].Battletag,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: RankArray,
      }]
    }
  });
}


function createGamertagOptions() {
  for (var i = 0; i < Gamertags.length; i++) {
    $('<option value="' + Gamertags[i].id + '">' + Gamertags[i].Battletag + '</option>').appendTo('#gt-select');
  }
}

function createSeasonOptions() {
  for (var i = 0; i < localSeasonData.length; i++) {
    $('<option value="' + localSeasonData[i].Number + '">' + "Season: " + localSeasonData[i].Number + '</option>').appendTo('#season-select');
  }
}
