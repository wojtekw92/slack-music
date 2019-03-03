'use strict';
module.exports = (sequelize, DataTypes) => {
  const Links = sequelize.define('Links', {
    channelName: DataTypes.STRING,
    userName: DataTypes.STRING,
    link: DataTypes.STRING,
    userId: DataTypes.STRING,
    channelId: DataTypes.STRING,
    ogImage: DataTypes.STRING,
    ogTitle: DataTypes.STRING,
    ogDescription: DataTypes.STRING
  }, {});
  Links.associate = function(models) {
    // associations can be defined here
  };
  return Links;
};