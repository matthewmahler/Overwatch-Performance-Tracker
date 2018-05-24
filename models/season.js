module.exports = function(sequelize, DataTypes) {
  var Season = sequelize.define("Season", {
    // Giving the Season model a name of type STRING
    Number: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    StartDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY
  },{
    timestamps: false
}

);

  Season.associate = function(models) {
    
    // Associating Season with Posts
    // When an Season is deleted, also delete any associated Posts
    Season.hasMany(models.Game, {
      onDelete: "cascade"
    });
  };

  return Season;
};
