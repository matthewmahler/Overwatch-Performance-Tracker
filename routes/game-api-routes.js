// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {


  //get games at a user route
  app.get("/api/games/", function (req, res) {
    console.log(req.query.User_id);
    db.Game.findAll({
      where: {
        GamertagId: req.query.User_id
        
      },
    }).then(function (dbGame) {
      res.json(dbGame);
    });
  });

  app.post("/api/games/", function (req, res) {
    db.Game.create(req.body).then(function (dbGame) {
      res.json(dbGame);
    });
  });

  // app.delete("/api/games/:id", function(req, res) {
  //   db.Game.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbGame) {
  //     res.json(dbGame);
  //   });
  // });

  // app.put("/api/games", function(req, res) {
  //   db.Game.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbGame) {
  //     res.json(dbGame);
  //   });
  // });


 

};
