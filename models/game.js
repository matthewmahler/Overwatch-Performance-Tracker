module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    AccountGameNumber: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    SeasonGameNumber: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    Rank: {
      type: DataTypes.INTEGER,
    },
    Map: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
     
    PlacementMatch: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
    },
    
    IfPlacementWLD: DataTypes.STRING,

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  });

  Game.associate = function(models) {
    // We're saying that a Game should belong to an User and a season
    // A Game can't be created without an User due to the foreign key constraint
    Game.belongsTo(models.Gamertag, {
      foreignKey: {
        allowNull: false
      },     
    });
    Game.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },     
    });
    Game.belongsTo(models.Season, {
      foreignKey: {
        allowNull: false
      },
      
    });
  };

  return Game;
};
