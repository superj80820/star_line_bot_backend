'use strict';
module.exports = (sequelize, DataTypes) => {
  const faceSubName = sequelize.define('faceSubName', {
    name: DataTypes.STRING,
    infoId: DataTypes.STRING
  }, {});
  faceSubName.associate = function(models) {
    // associations can be defined here
  };
  return faceSubName;
};