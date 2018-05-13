module.exports = function(sequelize, DataTypes) {
  var Season = sequelize.define("Season", {
    // Giving the Season model a name of type STRING
    name: DataTypes.STRING
  });

  Season.associate = function(models) {
    // Associating Season with Posts
    // When an Season is deleted, also delete any associated Posts
    Season.hasMany(models.Games, {
      onDelete: "cascade"
    });
  };

  return Season;
};
