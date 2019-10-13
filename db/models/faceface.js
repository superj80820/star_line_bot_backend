'use strict';
module.exports = (sequelize, DataTypes) => {
  const faceFace = sequelize.define('faceFace', {
    token: DataTypes.STRING,
    preview: DataTypes.STRING,
    infoId: DataTypes.INTEGER
  }, {});
  faceFace.associate = function(models) {
    // associations can be defined here
    faceFace.belongsTo(models.faceInfo, {
      foreignKey: 'infoId',
      onDelete: 'CASCADE'
    })
  };
  return faceFace;
};