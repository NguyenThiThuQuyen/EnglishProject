'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topic.hasMany(models.LessonList, {
        foreignKey: 'topicId', 
        as: 'topicData'})
    }
  };
  Topic.init({
    topicName: DataTypes.STRING,
    topicImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};