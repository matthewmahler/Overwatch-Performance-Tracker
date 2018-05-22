module.exports = function(sequelize, DataTypes) {
  var Gamertag = sequelize.define("Gamertag", {
    // Giving the Gamertag model a name of type STRING
    Battletag: {
      type: DataTypes.INTEGER,
    },
    
  });

  Gamertag.associate = function(models) {
    Gamertag.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },     
    });
    Gamertag.hasMany(models.Game, {
      onDelete: "cascade"
    });
  };

  return Gamertag;
};
