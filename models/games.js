module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    AccountGameNumber: DataTypes.INTEGER,
    SeasonGameNumber: DataTypes.INTEGER,	
    Rank: DataTypes.INTEGER,	
    Map: DataTypes.STRING,
    Season: DataTypes.INTEGER,	
    BattleTag: {
      type: DataTypes.STRING,
      foreignKey: true,
    },
    PlacementMatch: DataTypes.BOOLEAN,	
    IfPlacementWLD: DataTypes.STRING,

  });

  Game.associate = function(models) {
    // We're saying that a Game should belong to an Author
    // A Game can't be created without an Author due to the foreign key constraint
    Game.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Game;
};
