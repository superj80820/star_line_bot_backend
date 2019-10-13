'use strict';
module.exports = (sequelize, DataTypes) => {
  const faceInfo = sequelize.define('faceInfo', {
    name: DataTypes.STRING,
    romanization: DataTypes.STRING,
    detail: DataTypes.STRING,
    preview: DataTypes.STRING
  }, {});
  faceInfo.associate = function(models) {
    // associations can be defined here
  };
  return faceInfo;
};